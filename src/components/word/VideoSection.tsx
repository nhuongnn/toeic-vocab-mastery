'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Film, Play, ExternalLink, Sparkles, Volume2, Globe, RefreshCw, Languages, X, Search } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';
import { getCambridgeUrl, getOxfordUrl } from '@/lib/dictionary';

interface VideoSectionProps {
  video?: {
    youtubeId?: string;
    timestamp?: number;
    description: string;
  };
  word: string;
  category?: string;
}

type AccentType = 'all' | 'us' | 'uk' | 'aus';

export function VideoSection({ video, word }: VideoSectionProps) {
  const pathname = usePathname();
  const [isPlaying, setIsPlaying] = useState(false);
  const [accent, setAccent] = useState<AccentType>('all');
  const [activeTab, setActiveTab] = useState<'immersion' | 'custom'>('immersion');
  const [customUrl, setCustomUrl] = useState('');
  const [customVideoId, setCustomVideoId] = useState<string | null>(video?.youtubeId || null);
  const [translatedDesc, setTranslatedDesc] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const prevWordRef = useRef(word);
  const prevPathnameRef = useRef(pathname);

  const { speak } = useSpeech();

  // Safely and completely stop the playing video/audio
  const stopVideo = useCallback(() => {
    if (iframeRef.current) {
      try {
        // Send pause/stop command via YouTube iframe API
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'stopVideo', args: [] }),
          '*'
        );
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
          '*'
        );
        // Blank out the src to immediately kill the audio/video thread in the browser
        iframeRef.current.src = 'about:blank';
      } catch {
        // Ignore cross-origin errors
      }
    }
    setIsPlaying(false);
  }, []);

  // Automatically stop video whenever the word or pathname changes
  useEffect(() => {
    if (prevWordRef.current !== word || prevPathnameRef.current !== pathname) {
      prevWordRef.current = word;
      prevPathnameRef.current = pathname;
      stopVideo();
      setCustomVideoId(video?.youtubeId || null);
      setCustomUrl('');
      setTranslatedDesc(null);
    }
  }, [word, pathname, video?.youtubeId, stopVideo]);

  // Clean up and stop video on component unmount
  useEffect(() => {
    return () => {
      stopVideo();
    };
  }, [stopVideo]);

  // Intercept navigation link clicks (e.g. Next/Prev word, Navbar items) to instantly stop audio
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (
        target &&
        target.href &&
        !target.href.startsWith('#') &&
        target.target !== '_blank'
      ) {
        stopVideo();
      }
    };

    const handlePopState = () => {
      stopVideo();
    };

    document.addEventListener('click', handleLinkClick, { capture: true });
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleLinkClick, { capture: true });
      window.removeEventListener('popstate', handlePopState);
    };
  }, [stopVideo]);

  // Parse YouTube video ID from URL or ID
  const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const trimmed = url.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }
    const match = trimmed.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractYouTubeId(customUrl);
    if (id) {
      setCustomVideoId(id);
      setIsPlaying(true);
    }
  };

  const handleTranslateDescription = async () => {
    if (!video?.description) return;
    if (translatedDesc) {
      setTranslatedDesc(null); // toggle off
      return;
    }

    setIsTranslating(true);
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: video.description, targetLang: 'vi' }),
      });
      const data = await res.json();
      if (data.translatedText) {
        setTranslatedDesc(data.translatedText);
      }
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  // Clean word for YouGlish lookup
  const cleanWord = word.trim().toLowerCase().replace(/['’]/g, '').replace(/\s+/g, '-');

  // URL for YouGlish in new window
  const youGlishUrl = `https://youglish.com/pronounce/${encodeURIComponent(
    cleanWord
  )}/english/${accent}`;

  // Official YouGlish Embedded Player URL (using official /emb=1&e_id= path recognized by YouGlish)
  const youGlishEmbedUrl = `https://youglish.com/pronounce/${encodeURIComponent(
    cleanWord
  )}/english/${accent}/emb=1&e_id=yg_${encodeURIComponent(cleanWord)}&e_comp=8415`;

  // Custom YouTube video embed (when a valid YouTube ID is provided)
  const directYouTubeUrl = customVideoId
    ? `https://www.youtube-nocookie.com/embed/${customVideoId}?start=${video?.timestamp || 0}&autoplay=1&rel=0`
    : null;

  const currentEmbedUrl = activeTab === 'custom' ? directYouTubeUrl : youGlishEmbedUrl;

  const accentLabels: { key: AccentType; label: string; badge: string }[] = [
    { key: 'all', label: 'Tất cả (All)', badge: 'Đa dạng' },
    { key: 'us', label: 'Mỹ (US)', badge: 'TOEIC phổ biến' },
    { key: 'uk', label: 'Anh (UK)', badge: 'Chuẩn BBC' },
    { key: 'aus', label: 'Úc (AUS)', badge: 'TOEIC Part 3-4' },
  ];

  return (
    <section className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 text-rose-400">
          <Film className="w-5 h-5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
              Video & Multimedia Immersion
            </h3>
            <p className="text-[11px] text-slate-400">
              Xem video ngữ cảnh thực tế của người bản xứ trên YouTube
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-rose-400/90 bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <svg className="w-3 h-3 fill-rose-500" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            YouTube Embedded
          </span>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-800/60">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('immersion')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'immersion'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Ngữ cảnh bản xứ (YouGlish)
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'custom'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Video tùy chọn
          </button>
        </div>

        {/* Accent Selector & YouGlish Action (for Immersion tab) */}
        {activeTab === 'immersion' && (
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-[11px] text-slate-400 mr-1 flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-500" /> Giọng:
              </span>
              {accentLabels.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setAccent(item.key);
                    setIframeKey((prev) => prev + 1);
                  }}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                    accent === item.key
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                  }`}
                  title={item.badge}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <a
              href={youGlishUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all shadow-sm group"
              title="Mở ngữ cảnh YouGlish trong tab mới (không bị chặn bảo mật iframe)"
            >
              <span>Mở YouGlish ({accentLabels.find((a) => a.key === accent)?.label})</span>
              <ExternalLink className="w-3 h-3 text-amber-400/80 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        )}
      </div>

      {/* Custom Video Input Form (for Custom tab) */}
      {activeTab === 'custom' && (
        <form onSubmit={handleCustomSubmit} className="flex gap-2">
          <input
            type="text"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="Dán link YouTube (ví dụ: https://www.youtube.com/watch?v=...) hoặc video ID"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 flex-shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Xem video</span>
          </button>
        </form>
      )}

      {/* Video Player Display Container */}
      <div className="space-y-3">
        <div className="relative aspect-[16/10] sm:aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group">
          {isPlaying ? (
            <div className="relative w-full h-full">
              {currentEmbedUrl ? (
                <iframe
                  ref={iframeRef}
                  key={`${activeTab}-${accent}-${iframeKey}-${customVideoId}`}
                  src={currentEmbedUrl}
                  title={`Native usage of ${word}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-400 space-y-2">
                  <Film className="w-10 h-10 text-slate-600" />
                  <p className="text-xs">Chưa có video YouTube nào được chọn.</p>
                  <p className="text-[11px] text-slate-500">
                    Vui lòng chuyển sang tab <strong>&ldquo;Ngữ cảnh bản xứ&rdquo;</strong> hoặc dán link YouTube để xem.
                  </p>
                </div>
              )}

              {/* Action Toolbar on Top Right of Player */}
              <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
                <a
                  href={youGlishUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/40 shadow-md backdrop-blur text-[11px] font-semibold transition-colors flex items-center gap-1"
                  title="Mở ngữ cảnh YouGlish trong tab mới"
                >
                  <span>YouGlish</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
                <button
                  onClick={() => setIframeKey((prev) => prev + 1)}
                  className="p-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/60 shadow-md backdrop-blur transition-colors"
                  title="Tải lại video"
                  aria-label="Reload video"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={stopVideo}
                  className="p-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/60 shadow-md backdrop-blur transition-colors"
                  title="Đóng video"
                  aria-label="Close video"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Poster & Preview Screen */
            <div className="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 text-center">
              {/* Radial background decoration */}
              <div className="absolute inset-0 bg-radial from-rose-500/10 via-transparent to-transparent opacity-70" />

              <div className="relative z-10 flex flex-col items-center max-w-md space-y-3">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 hover:scale-110 active:scale-95 transition-all duration-200"
                  aria-label="Xem video trực tiếp"
                >
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                </button>

                <div>
                  <h4 className="text-base font-bold text-white tracking-wide flex items-center justify-center gap-2">
                    Xem người bản xứ phát âm <span className="text-rose-400 uppercase italic">&ldquo;{word}&rdquo;</span> trên YouGlish
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Hàng nghìn trích đoạn video YouTube thực tế kèm phụ đề tương tác YouGlish.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1 flex-wrap justify-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="px-4 py-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Xem video YouGlish</span>
                  </button>

                  <a
                    href={youGlishUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-colors flex items-center gap-1.5"
                    title="Mở ngữ cảnh YouGlish trong tab mới (không bị chặn bảo mật)"
                  >
                    <span>Mở YouGlish</span>
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </a>

                  <button
                    onClick={() => speak(word)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/80 transition-colors flex items-center gap-1.5"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Nghe audio</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Listening Focus & Notes */}
        {video?.description && (
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-400 font-semibold">
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                <span>Mục tiêu lắng nghe (Listening Focus):</span>
              </div>
              <button
                onClick={handleTranslateDescription}
                disabled={isTranslating}
                className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-300 transition-colors disabled:opacity-50"
              >
                <Languages className="w-3 h-3 text-indigo-400" />
                <span>
                  {isTranslating
                    ? 'Đang dịch...'
                    : translatedDesc
                    ? 'Hiện tiếng Anh'
                    : 'Dịch tiếng Việt'}
                </span>
              </button>
            </div>

            <p className="text-slate-300 pl-6 leading-relaxed">
              {translatedDesc || video.description}
            </p>
          </div>
        )}

        {/* External YouTube Quick Search Links */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span>Mở rộng tìm kiếm:</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                `${word} english pronunciation in context`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-semibold transition-colors"
            >
              <span>Tìm &ldquo;{word}&rdquo; trên YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <span className="text-slate-700">•</span>

            <a
              href={youGlishUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors"
              title="Tra cứu phát âm ngữ cảnh trên YouGlish"
            >
              <span>YouGlish</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <span className="text-slate-700">•</span>

            <a
              href={getCambridgeUrl(word)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors"
              title="Tra cứu trên Cambridge Dictionary"
            >
              <span>Cambridge</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <span className="text-slate-700">•</span>

            <a
              href={getOxfordUrl(word)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors"
              title="Tra cứu trên Oxford Learner's Dictionaries"
            >
              <span>Oxford</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
