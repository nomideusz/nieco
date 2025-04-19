import { JSX } from 'solid-js';
import { A } from "@solidjs/router";
import styles from './Header.module.css';

const Header = (): JSX.Element => {
  return (
    <header class={styles.header}>
      <div class={styles.brand}>
        <h1 class={styles.logo}>nieco.pl</h1>
        <p class={styles.tagline}>Nieco lepiej każdego dnia</p>
      </div>
      
      <nav class={styles.nav}>
        <ul>
          <li>
            <A href="/" end={true} activeClass={styles.active}>
              Strona główna
            </A>
          </li>
          <li>
            <A href="/dashboard" activeClass={styles.active}>
              Panel
            </A>
          </li>
          <li>
            <A href="/about" activeClass={styles.active}>
              O aplikacji
            </A>
          </li>
          <li>
            <A href="/team" activeClass={styles.active}>
              Zespół
            </A>
          </li>
          <li>
            <A href="/users" activeClass={styles.active}>
              Użytkownicy
            </A>
          </li>
          <li>
            <A href="/actions-demo" activeClass={styles.active}>
              Actions Demo
            </A>
          </li>
          <li>
            <A href="/router-info" activeClass={styles.active}>
              Router Info
            </A>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;