import { JSX } from 'solid-js';
import Header from '../components/Header';

interface RootLayoutProps {
  children?: JSX.Element;
}

const RootLayout = (props: RootLayoutProps) => {
  return (
    <div class="app-container">
      <Header />
      <main>
        {props.children}
      </main>
      <footer style="text-align: center; padding: 20px; background-color: #f0f0f0; margin-top: 30px;">
        <p>&copy; 2025 nieco.pl - Wszystkie prawa zastrzeżone</p>
        <p style="margin-top: 10px; font-size: 0.9rem; color: #666;">
          Aplikacja demonstracyjna wykorzystująca SolidJS i SolidJS Router
        </p>
      </footer>
    </div>
  );
};

export default RootLayout; 