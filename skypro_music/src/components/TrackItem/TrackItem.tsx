'use client';

import type { Track } from '@/types/track';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectTrack } from '@/store/playerSlice';
import styles from './TrackItem.module.css';

interface TrackItemProps {
  track: Track;
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

export default function TrackItem({ track }: TrackItemProps) {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);
  const isCurrentTrack = currentTrack?._id === track._id;

  return (
    <button
      type="button"
      className={styles.playlist__track}
      onClick={() => dispatch(selectTrack(track))}
      aria-label={`Воспроизвести ${track.name} — ${track.author}`}
      aria-pressed={isCurrentTrack}
    >
      <span className={styles.track__title}>
        <span className={styles.track__titleImage} aria-hidden="true">
          <svg className={styles.track__titleSvg}>
            <use href="/icon/sprite.svg#icon-note" />
          </svg>
        </span>
        <span className={styles['track__title-text']}>
          <span className={styles.track__titleLink}>{track.name}</span>
          {isCurrentTrack && (
            <span
              className={`${styles.track__playingDot} ${isPlaying ? styles.track__playingDot_active : ''}`}
              aria-label={isPlaying ? 'Сейчас играет' : 'На паузе'}
              title={isPlaying ? 'Сейчас играет' : 'На паузе'}
            />
          )}
        </span>
      </span>
      <span className={styles.track__author}>
        <span className={styles.track__authorLink}>{track.author}</span>
      </span>
      <span className={styles.track__album}>
        <span className={styles.track__albumLink}>{track.album}</span>
      </span>
      <span className={styles.track__time}>
        <span className={styles.track__timeText}>{formatDuration(track.duration_in_seconds)}</span>
      </span>
    </button>
  );
}
