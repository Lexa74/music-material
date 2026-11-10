import styles from './page.module.css';
import Navigation from '@/components/Navigation/Navigation';
import CenterBlock from '@/components/CenterBlock/CenterBlock';
import Sidebar from '@/components/Sidebar/Sidebar';
import Player from '@/components/Player/Player';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <CenterBlock />
          <Sidebar />
        </main>
        <Player />
        <footer />
      </div>
    </div>
  );
}
