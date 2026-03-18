import { useEffect, useRef, useState } from 'react';
import type { Story } from '../../api/types';

interface AudioPlayerProps {
  story: Story;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function AudioPlayer({ story }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => setPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      await audio.play();
      setPlaying(true);
    }
  };

  const skipBack = () => {
    if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 15);
  };

  const skipForward = () => {
    if (audioRef.current) audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 15);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * duration;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div>
      {story.audio_url && (
        <audio ref={audioRef} src={story.audio_url} preload="metadata" />
      )}

      {/* Progress bar */}
      <div className="mb-6">
        <div
          className="h-1 rounded-full overflow-hidden cursor-pointer mb-2"
          style={{ background: 'rgba(255,255,255,0.1)' }}
          onClick={handleSeek}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #7c3aed, #60a5fa)',
            }}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-[11px] font-semibold text-[#64748b]">
            {formatTime(currentTime)}
          </span>
          <span className="text-[11px] font-semibold text-[#64748b]">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-7">
        <button
          type="button"
          onClick={skipBack}
          className="size-11 flex items-center justify-center rounded-[22px] text-lg text-[#94a3b8] cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          ⏮
        </button>

        <button
          type="button"
          onClick={togglePlay}
          className="size-[72px] flex items-center justify-center rounded-[36px] text-white text-2xl cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
            boxShadow: '0 8px 32px rgba(124,58,237,0.5)',
          }}
        >
          {playing ? '⏸' : '▶'}
        </button>

        <button
          type="button"
          onClick={skipForward}
          className="size-11 flex items-center justify-center rounded-[22px] text-lg text-[#94a3b8] cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          ⏭
        </button>
      </div>
    </div>
  );
}
