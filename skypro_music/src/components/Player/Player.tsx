'use client';

import { useEffect, useRef, useState } from 'react';
import { data } from '@/data';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectTrack, setPlaying } from '@/store/playerSlice';
import styles from './Player.module.css';

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.player);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.65);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentTrack) {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      return;
    }

    if (audio.getAttribute('src') !== currentTrack.track_file) {
      audio.src = currentTrack.track_file;
      audio.load();
    }

    if (isPlaying) {
      void audio.play().catch(() => dispatch(setPlaying(false)));
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying, dispatch]);


  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const changeTrack = (direction: -1 | 1) => {
    if (!currentTrack) return;
    const currentIndex = data.findIndex((track) => track._id === currentTrack._id);
    if (currentIndex < 0) return;
    const nextIndex = (currentIndex + direction + data.length) % data.length;
    dispatch(selectTrack(data[nextIndex]));
  };

  const playRandomTrack = () => {
    if (data.length === 0) return;
    const availableTracks = data.filter((track) => track._id !== currentTrack?._id);
    const randomTrack = availableTracks[Math.floor(Math.random() * availableTracks.length)];
    if (randomTrack) dispatch(selectTrack(randomTrack));
  };

  const togglePlayback = () => {
    if (!currentTrack) {
      dispatch(selectTrack(data[0]));
      return;
    }
    dispatch(setPlaying(!isPlaying));
  };

  const handleSeek = (value: string) => {
    const nextTime = Number(value);
    if (audioRef.current && Number.isFinite(nextTime)) {
      audioRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        className={styles.audio}
        preload="none"
        onPlay={() => dispatch(setPlaying(true))}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onEnded={() => {
          if (isRepeat && audioRef.current) {
            audioRef.current.currentTime = 0;
            void audioRef.current.play().catch(() => dispatch(setPlaying(false)));
          } else {
            dispatch(setPlaying(false));
          }
        }}
        onError={() => dispatch(setPlaying(false))}
      />
      <div className={styles.bar__content}>
        <div className={styles.bar__playerProgress}>
          <input
            className={styles.progress__input}
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => handleSeek(event.target.value)}
            aria-label="Позиция воспроизведения"
            style={{ background: `linear-gradient(to right, #b672ff ${progress}%, #4b4949 ${progress}%)` }}
            disabled={!currentTrack || !duration}
          />
        </div>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <button type="button" className={styles.player__btnPrev} onClick={() => changeTrack(-1)} disabled={!currentTrack} aria-label="Предыдущий трек">
                <svg className={styles.player__btnPrevSvg}><use href="/icon/sprite.svg#icon-prev" /></svg>
              </button>
              <button type="button" className={`${styles.player__btnPlay} ${styles.btn}`} onClick={togglePlayback} aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'} disabled={data.length === 0}>
                <svg className={styles.player__btnPlaySvg}>
                  <use href={`/icon/sprite.svg#icon-${isPlaying ? 'pause' : 'play'}`} />
                </svg>
              </button>
              <button type="button" className={styles.player__btnNext} onClick={() => (isShuffle ? playRandomTrack() : changeTrack(1))} disabled={!currentTrack} aria-label="Следующий трек">
                <svg className={styles.player__btnNextSvg}><use href="/icon/sprite.svg#icon-next" /></svg>
              </button>
              <button type="button" className={`${styles.player__btnRepeat} ${styles.btnIcon} ${isRepeat ? styles.controlActive : ''}`} onClick={() => setIsRepeat((value) => !value)} aria-label="Повтор трека" aria-pressed={isRepeat}>
                <svg className={styles.player__btnRepeatSvg}><use href="/icon/sprite.svg#icon-repeat" /></svg>
              </button>
              <button type="button" className={`${styles.player__btnShuffle} ${styles.btnIcon} ${isShuffle ? styles.controlActive : ''}`} onClick={() => setIsShuffle((value) => !value)} aria-label="Случайный порядок" aria-pressed={isShuffle}>
                <svg className={styles.player__btnShuffleSvg}><use href="/icon/sprite.svg#icon-shuffle" /></svg>
              </button>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image} aria-hidden="true">
                  <svg className={styles.trackPlay__svg}><use href="/icon/sprite.svg#icon-note" /></svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <span className={styles.trackPlay__authorLink}>{currentTrack?.name ?? 'Выберите трек'}</span>
                </div>
                <div className={styles.trackPlay__album}>
                  <span className={styles.trackPlay__albumLink} title={currentTrack?.album ?? ''}>{currentTrack?.author ?? 'Skypro.Music'}</span>
                </div>
              </div>
              <div className={styles.trackPlay__dislike}>
                <button type="button" className={`${styles.player__btnShuffle} ${styles.btnIcon}`} aria-label="Добавить в избранное">
                  <svg className={styles.trackPlay__likeSvg}><use href="/icon/sprite.svg#icon-like" /></svg>
                </button>
                <button type="button" className={`${styles.trackPlay__dislike} ${styles.btnIcon}`} aria-label="Не нравится">
                  <svg className={styles.trackPlay__dislikeSvg}><use href="/icon/sprite.svg#icon-dislike" /></svg>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg} aria-hidden="true"><use href="/icon/sprite.svg#icon-volume" /></svg>
              </div>
              <div className={styles.volume__progress}>
                <input
                  className={styles.volume__progressLine}
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                  aria-label="Громкость"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.player__time} aria-live="off">
          <span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
