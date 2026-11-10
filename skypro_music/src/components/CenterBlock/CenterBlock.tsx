'use client';

import { useMemo, useState } from 'react';
import styles from './CenterBlock.module.css';
import { data } from '@/data';
import TrackItem from '@/components/TrackItem/TrackItem';

type FilterName = 'author' | 'year' | 'genre';

const filterLabels: Record<FilterName, string> = {
  author: 'исполнителю',
  year: 'году выпуска',
  genre: 'жанру',
};

export default function CenterBlock() {
  const [activeFilter, setActiveFilter] = useState<FilterName | null>(null);
  const filterOptions = useMemo<Record<FilterName, string[]>>(() => ({
    author: [...new Set<string>(data.map((track) => track.author))].sort((a, b) => a.localeCompare(b, 'ru')),
    year: [...new Set<string>(data.map((track) => track.release_date.slice(0, 4)))].sort((a, b) => Number(b) - Number(a)),
    genre: [...new Set<string>(data.flatMap((track) => track.genre))].sort((a, b) => a.localeCompare(b, 'ru')),
  }), []);

  return (
    <section className={styles.centerblock} aria-label="Список треков">
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg} aria-hidden="true"><use href="/icon/sprite.svg#icon-search" /></svg>
        <input className={styles.search__text} type="search" placeholder="Поиск" name="search" aria-label="Поиск треков" />
      </div>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        {(Object.keys(filterLabels) as FilterName[]).map((filter) => (
          <div className={styles.filter__group} key={filter}>
            <button
              type="button"
              className={`${styles.filter__button} ${activeFilter === filter ? styles.active : ''}`}
              aria-expanded={activeFilter === filter}
              onClick={() => setActiveFilter((current) => current === filter ? null : filter)}
            >
              {filterLabels[filter]}
            </button>
            {activeFilter === filter && (
              <div className={styles.filter__dropdown}>
                <ul className={styles.filter__list}>
                  {filterOptions[filter].map((option) => <li className={styles.filter__option} key={option}>{option}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={`${styles.playlistTitle__col} ${styles.col01}`}>Трек</div>
          <div className={`${styles.playlistTitle__col} ${styles.col02}`}>Исполнитель</div>
          <div className={`${styles.playlistTitle__col} ${styles.col03}`}>Альбом</div>
          <div className={`${styles.playlistTitle__col} ${styles.col04}`}><svg className={styles.playlistTitle__svg} aria-label="Длительность"><use href="/icon/sprite.svg#icon-watch" /></svg></div>
        </div>
        <div className={styles.content__playlist}>
          {data.map((track) => <TrackItem key={track._id} track={track} />)}
        </div>
      </div>
    </section>
  );
}
