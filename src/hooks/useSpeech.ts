'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

export function useSpeech() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize SpeechSynthesis voices as fallback
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if (typeof window !== 'undefined') {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      }
    };
  }, []);

  // Browser SpeechSynthesis Fallback with smart voice scoring
  const playSpeechSynthesis = useCallback(
    (text: string, accent: string = 'en-US', rate: number = 0.9) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setIsPlaying(false);
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = 1.0;

      // Smart Voice Ranking: Avoid robotic eSpeak / speech-dispatcher if natural voices exist
      const matchingVoices = voices.filter(
        (v) => v.lang.startsWith(accent) || v.lang.replace('_', '-').startsWith(accent)
      );

      if (matchingVoices.length > 0) {
        const sorted = [...matchingVoices].sort((a, b) => {
          const score = (v: SpeechSynthesisVoice) => {
            const name = v.name.toLowerCase();
            let s = 0;
            if (name.includes('natural') || name.includes('neural')) s += 100;
            if (name.includes('google')) s += 80;
            if (name.includes('samantha') || name.includes('karen') || name.includes('daniel')) s += 60;
            if (name.includes('microsoft')) s += 50;
            if (name.includes('enhanced') || name.includes('premium')) s += 40;
            if (name.includes('espeak') || name.includes('speech-dispatcher')) s -= 100;
            return s;
          };
          return score(b) - score(a);
        });

        utterance.voice = sorted[0];
      }

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    },
    [voices]
  );

  const stop = useCallback(() => {
    // Stop HTML5 Audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    // Stop SpeechSynthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setIsPlaying(false);
  }, []);

  const speak = useCallback(
    (
      text: string,
      accent: 'en-US' | 'en-GB' | 'en-AU' = 'en-US',
      rate: number = 0.9
    ) => {
      if (!text || !text.trim()) return;

      // Always stop previous playback first
      stop();

      const cleanText = text.trim();

      // 1. Primary Engine: High-Definition Cloud Audio via /api/tts
      try {
        const ttsUrl = `/api/tts?text=${encodeURIComponent(cleanText)}&accent=${accent}`;
        const audio = new Audio(ttsUrl);
        audio.playbackRate = rate;
        audioRef.current = audio;

        audio.onplay = () => setIsPlaying(true);
        audio.onended = () => {
          setIsPlaying(false);
          audioRef.current = null;
        };
        audio.onerror = () => {
          // If network fails or offline, smoothly fallback to SpeechSynthesis
          console.warn('Cloud audio stream failed, falling back to browser SpeechSynthesis');
          audioRef.current = null;
          playSpeechSynthesis(cleanText, accent, rate);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Audio play prevented or failed, fallback to SpeechSynthesis:', err);
            audioRef.current = null;
            playSpeechSynthesis(cleanText, accent, rate);
          });
        }
      } catch (err) {
        console.warn('Failed to initialize Audio, fallback to SpeechSynthesis:', err);
        playSpeechSynthesis(cleanText, accent, rate);
      }
    },
    [playSpeechSynthesis, stop]
  );

  return {
    speak,
    stop,
    isPlaying,
    voicesAvailable: voices.length > 0,
  };
}
