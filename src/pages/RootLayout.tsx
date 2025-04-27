import { JSX } from 'solid-js';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';

interface RootLayoutProps {
  children?: JSX.Element;
}

const RootLayout = (props: RootLayoutProps) => {
  return (
    <div class="app-container">
      <Header />
      <main style="animation: fadeIn var(--transition-medium) forwards;">
        {props.children}
      </main>
      <footer style="
        text-align: center; 
        padding: 40px 20px;
        margin-top: 80px;
        background-color: var(--bg-light);
        border-top: 1px solid var(--border-color);
        border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
        box-shadow: 0 -5px 15px rgba(0,0,0,0.02);
      ">
        <div style="max-width: 700px; margin: 0 auto;">
          <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 30px;">
            <div style="
              position: relative;
              padding-bottom: 10px;
            ">
              <h2 style="
                margin: 0;
                color: var(--primary-color);
                font-size: 1.6rem;
                font-weight: bold;
              ">nieco.pl</h2>
              <div style="
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 40px;
                height: 3px;
                background-color: var(--primary-color);
                border-radius: 2px;
              "></div>
            </div>
          </div>
          
          <div style="
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-bottom: 30px;
            flex-wrap: wrap;
          ">
            <a href="#" style="
              color: var(--text-secondary);
              text-decoration: none;
              font-size: 0.9rem;
              transition: all var(--transition-fast);
              position: relative;
              padding: 5px 0;
              &:hover {
                color: var(--primary-color);
              }
              &:hover::after {
                width: 100%;
              }
              &::after {
                content: '';
                position: absolute;
                width: 0;
                height: 2px;
                bottom: 0;
                left: 0;
                background-color: var(--primary-color);
                transition: width var(--transition-fast);
              }
            ">O nas</a>
            <a href="#" style="
              color: var(--text-secondary);
              text-decoration: none;
              font-size: 0.9rem;
              transition: all var(--transition-fast);
              position: relative;
              padding: 5px 0;
              &:hover {
                color: var(--primary-color);
              }
              &:hover::after {
                width: 100%;
              }
              &::after {
                content: '';
                position: absolute;
                width: 0;
                height: 2px;
                bottom: 0;
                left: 0;
                background-color: var(--primary-color);
                transition: width var(--transition-fast);
              }
            ">Kontakt</a>
            <a href="#" style="
              color: var(--text-secondary);
              text-decoration: none;
              font-size: 0.9rem;
              transition: all var(--transition-fast);
              position: relative;
              padding: 5px 0;
              &:hover {
                color: var(--primary-color);
              }
              &:hover::after {
                width: 100%;
              }
              &::after {
                content: '';
                position: absolute;
                width: 0;
                height: 2px;
                bottom: 0;
                left: 0;
                background-color: var(--primary-color);
                transition: width var(--transition-fast);
              }
            ">Polityka prywatności</a>
            <a href="#" style="
              color: var(--text-secondary);
              text-decoration: none;
              font-size: 0.9rem;
              transition: all var(--transition-fast);
              position: relative;
              padding: 5px 0;
              &:hover {
                color: var(--primary-color);
              }
              &:hover::after {
                width: 100%;
              }
              &::after {
                content: '';
                position: absolute;
                width: 0;
                height: 2px;
                bottom: 0;
                left: 0;
                background-color: var(--primary-color);
                transition: width var(--transition-fast);
              }
            ">Warunki użytkowania</a>
          </div>
          
          <div style="padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.05);">
            <p style="color: var(--text-muted); margin: 0; font-size: 0.85rem;">
              &copy; 2025 nieco.pl - Wszystkie prawa zastrzeżone
            </p>
            <p style="color: var(--text-muted); margin-top: 5px; font-size: 0.8rem;">
              Aplikacja wykorzystująca SolidJS i SolidJS Router
            </p>
          </div>
        </div>
      </footer>
      <LoginModal />
    </div>
  );
};

export default RootLayout; 