import Link from 'next/link';
import Image from 'next/image';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
          <nav className={styles.main__nav}>
            <div className={styles.nav__logo}>
<Image src="/logo.png" width={227} height={34}
                className={styles.logo__image}
                
                alt={'logo'}
              />
            </div>
            <div className={styles.nav__burger}>
              <span className={styles.burger__line}></span>
              <span className={styles.burger__line}></span>
              <span className={styles.burger__line}></span>
            </div>
            <div className={styles.nav__menu}>
              <ul className={styles.menu__list}>
                <li className={styles.menu__item}>
<Link href="/" className={styles.menu__link}>
                    Главное
                  </Link>
                </li>
                <li className={styles.menu__item}>
                  <Link href="/" className={styles.menu__link}>
                    Мой плейлист
                  </Link>
                </li>
                <li className={styles.menu__item}>
                  <Link href="/signin" className={styles.menu__link}>
                    Войти
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
  );
}
