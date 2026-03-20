import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import type { Story } from '../../api/types';
import { storiesApi } from '../../api/stories';
import { colors, gradients, glass, shadows, transition, fontSize, fontWeight, radius } from '../../styles/tokens';

interface AudioPlayerProps {
  story: Story;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const ProgressSection = styled.div`
  margin-bottom: 1.5rem;
`;

const ProgressTrack = styled.div`
  height: 4px;
  border-radius: ${radius.pill};
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 0.5rem;
  background: ${glass.border};
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  border-radius: ${radius.pill};
  transition: width ${transition.fast};
  width: ${({ $progress }) => $progress}%;
  background: ${gradients.progressBlue};
`;

const TimeRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TimeText = styled.span`
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
  color: ${colors.textMuted};
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.75rem;
`;

const SkipButton = styled.button`
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.xl};
  font-size: 1.125rem;
  color: ${colors.textSecondary};
  cursor: pointer;
  background: ${glass.bg};
  border: 1px solid ${glass.border};
`;

const PlayButton = styled.button`
  width: 4.5rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 36px;
  font-size: 1.5rem;
  color: ${colors.white};
  cursor: pointer;
  background: ${gradients.primaryDiag};
  box-shadow: ${shadows.playButton};
`;

export function AudioPlayer({ story }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    storiesApi.getAudioBlobUrl(story.id).then((url) => {
      objectUrl = url;
      setBlobUrl(url);
    }).catch(() => {});
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [story.id]);

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
      {blobUrl && (
        <audio ref={audioRef} src={blobUrl} preload="metadata" />
      )}

      <ProgressSection>
        <ProgressTrack onClick={handleSeek}>
          <ProgressFill $progress={progress} />
        </ProgressTrack>
        <TimeRow>
          <TimeText>{formatTime(currentTime)}</TimeText>
          <TimeText>{formatTime(duration)}</TimeText>
        </TimeRow>
      </ProgressSection>

      <Controls>
        <SkipButton type="button" onClick={skipBack}>⏮</SkipButton>
        <PlayButton type="button" onClick={togglePlay}>
          {playing ? '⏸' : '▶'}
        </PlayButton>
        <SkipButton type="button" onClick={skipForward}>⏭</SkipButton>
      </Controls>
    </div>
  );
}
