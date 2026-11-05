'use client';

import { useMemo, useState } from 'react';
import styles from './CenterBlock.module.css';
import { data } from '@/data';
import type { Track } from '@/data';
import TrackItem from '@/components/TrackItem/TrackItem';
import FilterDropdown, { type FilterName } from '@/components/FilterDropdown/FilterDropdown';

type FilterConfig = { name: FilterName; options: string[] };

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'ru'));
}

export default function CenterBlock() {
  const [activeFilter, setActiveFilter] = useState<FilterName | null>(null);
  const tracks: Track[] = data;

  const filters = useMemo<FilterConfig[]>(() => {
    const authors = uniqueSorted(tracks.map((track) => track.author).filter((author) => author !== '-'));
    const years = uniqueSorted(tracks.map((track) => String(new Date(`${track.release_date}T00:00:00`).getFullYear())))
      .sort((a, b) => Number(b) - Number(a));
    const genres = uniqueSorted(tracks.flatMap((track) => track.genre));
    return [
      { name: 'Исполнителю', options: authors },
      { name: 'году выпуска', options: years },
      { name: 'жанру', options: genres },
    ];
  }, [tracks]);

  const handleFilterClick = (name: FilterName) => {
    setActiveFilter((current) => current === name ? null : name);
  };

  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg} aria-hidden="true"><use href="/icon/sprite.svg#icon-search" /></svg>
        <input className={styles.search__text} type="search" placeholder="Поиск" name="search" aria-label="Поиск треков" />
      </div>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        {filters.map(({ name, options }) => (
          <div className={styles.filter__wrapper} key={name}>
            <button
              type="button"
              className={`${styles.filter__button} ${activeFilter === name ? styles.active : ''}`}
              aria-expanded={activeFilter === name}
              onClick={() => handleFilterClick(name)}
            >{name}</button>
            {activeFilter === name && <FilterDropdown title={name} options={options} />}
          </div>
        ))}
      </div>
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={`${styles.playlistTitle__col} ${styles.col01}`}>Трек</div>
          <div className={`${styles.playlistTitle__col} ${styles.col02}`}>Исполнитель</div>
          <div className={`${styles.playlistTitle__col} ${styles.col03}`}>Альбом</div>
          <div className={`${styles.playlistTitle__col} ${styles.col04}`}>
            <svg className={styles.playlistTitle__svg} aria-hidden="true"><use href="/icon/sprite.svg#icon-watch" /></svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {tracks.map((track) => <TrackItem key={track._id} track={track} />)}
        </div>
      </div>
    </div>
  );
}
