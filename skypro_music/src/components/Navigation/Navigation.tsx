'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navigation.module.css';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <nav className={styles.main__nav} aria-label="Главная навигация">
      <div className={styles.nav__logo}>
        <Image src="/logo.png" width={227} height={34} className={styles.logo__image} alt="Skypro Music" priority />
      </div>
      <button
        type="button"
        className={styles.nav__burger}
        aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={isMenuOpen}
        aria-controls="main-navigation-menu"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        <span className={styles.burger__line} />
        <span className={styles.burger__line} />
        <span className={styles.burger__line} />
      </button>
      <div id="main-navigation-menu" className={`${styles.nav__menu} ${isMenuOpen ? styles.nav__menuOpen : styles.nav__menuClosed}`}>
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}><Link href="/" className={styles.menu__link}>Главное</Link></li>
          <li className={styles.menu__item}><Link href="/" className={styles.menu__link}>Мой плейлист</Link></li>
          <li className={styles.menu__item}><Link href="/signin" className={styles.menu__link}>Войти</Link></li>
        </ul>
      </div>
    </nav>
  );
}
