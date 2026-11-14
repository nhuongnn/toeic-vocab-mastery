'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Image as ImageIcon, Sparkles, Lightbulb, RotateCw, Languages, Loader2 } from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';

interface VisualAssociationProps {
  visual: VocabularyWord['visual'];
  word: string;
}

export function VisualAssociation({ visual, word }: VisualAssociationProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(visual.imageUrl || null);
  const [photographer, setPhotographer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!visual.imageUrl);
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const [hasImgError, setHasImgError] = useState<boolean>(false);
  const [showSceneTranslation, setShowSceneTranslation] = useState<boolean>(false);
  const [sceneTranslation, setSceneTranslation] = useState<string | null>(null);

  const fetchImage = useCallback(
    async (isRefresh = false) => {
      if (visual.imageUrl && !isRefresh) {
        setImageUrl(visual.imageUrl);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setHasImgError(false);
      setIsImgLoaded(false);

      try {
        const queryParams = new URLSearchParams({
          word,
          query: visual.imageKeyword || word,
          description: visual.imageDescription || '',
          ...(isRefresh ? { refresh: 'true' } : {}),
        });

        const res = await fetch(`/api/images?${queryParams.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch image');
        const data = await res.json();

        if (data.results && data.results.length > 0) {
          const photo = data.results[0];
          setImageUrl(photo.urls?.regular || photo.urls?.small || null);
          setPhotographer(photo.user?.name || null);
        } else {
          setHasImgError(true);
        }
      } catch (err) {
        console.error('Error fetching visual image:', err);
        setHasImgError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [word, visual.imageKeyword, visual.imageDescription, visual.imageUrl]
  );

  useEffect(() => {
    fetchImage(false);
  }, [fetchImage]);

  const toggleTranslateScene = async () => {
    if (showSceneTranslation) {
      setShowSceneTranslation(false);
      return;
    }
    setShowSceneTranslation(true);
    if (sceneTranslation) return;

    setSceneTranslation('loading');
    try {
      const res = await fetch(`/api/translate?text=${encodeURIComponent(visual.imageDescription)}&from=en&to=vi`);
      if (res.ok) {
        const data = await res.json();
        setSceneTranslation(data.translatedText || 'Không có bản dịch');
      } else {
        setSceneTranslation('Lỗi tải bản dịch');
      }
    } catch {
      setSceneTranslation('Lỗi kết nối dịch tự động');
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-400">
          <ImageIcon className="w-5 h-5" />
          <h3 className="text-base font-bold uppercase tracking-wider text-slate-200">
            Visual Association & Mental Anchor
          </h3>
        </div>

        {/* Regenerate / Refresh Button */}
        <button
          onClick={() => fetchImage(true)}
          disabled={isLoading}
          title="Tạo lại hoặc đổi ảnh minh họa"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/80 transition-all disabled:opacity-50"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Đang tạo...' : 'Đổi ảnh'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Visual Image Container */}
        <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-slate-800 flex items-center justify-center group">
          {/* Loading Skeleton */}
          {isLoading && (
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-10 animate-pulse">
              <RotateCw className="w-6 h-6 text-indigo-400 animate-spin" />
              <span className="text-xs text-slate-400">Đang chuẩn bị ảnh minh họa cho &ldquo;{word}&rdquo;...</span>
            </div>
          )}

          {/* Actual Image */}
          {!hasImgError && imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={visual.imageDescription || `Minh họa từ ${word}`}
                onLoad={() => setIsImgLoaded(true)}
                onError={() => {
                  setHasImgError(true);
                  setIsLoading(false);
                }}
                className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
                  isImgLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Source Attribution Badge */}
              {photographer && isImgLoaded && (
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] text-slate-300 font-medium">
                  {photographer.includes('Unsplash')
                    ? 'Photo via Unsplash'
                    : photographer.includes('Pexels')
                    ? 'Photo via Pexels'
                    : 'AI Visual Anchor'}
                </div>
              )}
            </>
          ) : (
            /* Fallback when image error or offline */
            <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-indigo-950/20 via-slate-900 to-slate-950">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                {word}
              </h4>
              <p className="text-xs text-slate-400 max-w-xs line-clamp-3">
                {visual.imageDescription}
              </p>
              <button
                onClick={() => fetchImage(true)}
                className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 underline"
              >
                Thử tải lại ảnh
              </button>
            </div>
          )}
        </div>

        {/* Narrative & Mnemonic */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Visual Scene Description
              </div>
              <button
                onClick={toggleTranslateScene}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                title="Dịch mô tả hình ảnh sang tiếng Việt"
              >
                <Languages className="w-3 h-3" />
                <span>{showSceneTranslation ? 'Ẩn dịch' : 'Dịch tiếng Việt'}</span>
              </button>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {visual.imageDescription}
            </p>
            {showSceneTranslation && (
              <p className="text-xs text-emerald-300/90 pt-1.5 border-t border-slate-800/80 leading-relaxed animate-in fade-in">
                {sceneTranslation === 'loading' ? (
                  <span className="flex items-center gap-1.5 text-indigo-300">
                    <Loader2 className="w-3 h-3 animate-spin" /> Đang dịch...
                  </span>
                ) : (
                  <span>🇻🇳 {sceneTranslation}</span>
                )}
              </p>
            )}
          </div>

          {visual.mnemonic && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">
                <Lightbulb className="w-4 h-4" />
                <span>Mnemonic Memory Trigger</span>
              </div>
              <p className="text-sm text-amber-100/90 leading-relaxed font-medium">
                {visual.mnemonic}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
