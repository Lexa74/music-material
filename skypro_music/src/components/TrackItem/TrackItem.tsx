import Link from 'next/link';
import type { Track } from '@/data';
import styles from '../CenterBlock/CenterBlock.module.css';

type TrackItemProps = { track: Track };

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

export default function TrackItem({ track }: TrackItemProps) {
  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg className={styles.track__titleSvg} aria-hidden="true"><use href="/icon/sprite.svg#icon-note" /></svg>
          </div>
          <div className={styles['track__title-text']}>
            <Link className={styles.track__titleLink} href="/">{track.name}</Link>
          </div>
        </div>
        <div className={styles.track__author}><Link className={styles.track__authorLink} href="/">{track.author}</Link></div>
        <div className={styles.track__album}><Link className={styles.track__albumLink} href="/">{track.album}</Link></div>
        <div className={styles.track__time}>
          <svg className={styles.track__timeSvg} aria-hidden="true"><use href="/icon/sprite.svg#icon-like" /></svg>
          <span className={styles.track__timeText}>{formatDuration(track.duration_in_seconds)}</span>
        </div>
      </div>
    </div>
  );
}
