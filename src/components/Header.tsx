import { JSX, Show } from 'solid-js';
import { A } from "@solidjs/router";
import userStore from '../store/userStore';

const Header = (): JSX.Element => {
  const { user, logout, setIsLoginModalOpen } = userStore;

  const handleLogin = (e: Event) => {
    e.preventDefault();
    console.log("Login button clicked");
    console.log("Before setting modal state:", userStore.isLoginModalOpen());
    
    // Force update to change detection
    setTimeout(() => {
      setIsLoginModalOpen(true);
      console.log("After setting modal state:", userStore.isLoginModalOpen());
    }, 0);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header style="
      background-color: white; 
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 0 24px;
    ">
      <div style="
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0;
      ">
        {/* Logo section */}
        <div style="display: flex; align-items: center;">
          <A href="/" style="
            font-size: 1.8rem;
            font-weight: 800;
            color: var(--primary-color);
            text-decoration: none;
            letter-spacing: -0.5px;
          ">nieco.pl</A>
          <p style="
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin: 0 0 0 10px;
            padding-left: 10px;
            border-left: 2px solid var(--border-color);
          ">Nieco lepiej każdego dnia</p>
        </div>
        
        {/* Navigation */}
        <nav style="flex: 1; display: flex; justify-content: center;">
          <ul style="
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 10px;
          ">
            <li>
              <A href="/dashboard" style="
                color: var(--text-secondary);
                text-decoration: none;
                font-weight: 500;
                padding: 10px 16px;
                border-radius: var(--border-radius-md);
                transition: all var(--transition-fast);
                &:hover {
                  background-color: var(--bg-light);
                  color: var(--primary-color);
                }
              " activeClass="active-nav">
                Panel
              </A>
            </li>
            <li>
              <A href="/users" style="
                color: var(--text-secondary);
                text-decoration: none;
                font-weight: 500;
                padding: 10px 16px;
                border-radius: var(--border-radius-md);
                transition: all var(--transition-fast);
                &:hover {
                  background-color: var(--bg-light);
                  color: var(--primary-color);
                }
              " activeClass="active-nav">
                Użytkownicy
              </A>
            </li>
          </ul>
        </nav>

        {/* User section */}
        <div>
          <Show when={user.isLoggedIn} fallback={
            <button 
              onClick={handleLogin}
              class="btn btn-primary"
              style="
                font-weight: 600;
                min-width: 120px;
                box-shadow: 0 4px 10px rgba(74, 111, 165, 0.2);
              "
            >
              Zaloguj się
            </button>
          }>
            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="
                color: var(--text-primary); 
                font-weight: 500;
                background-color: var(--bg-light);
                padding: 8px 16px;
                border-radius: var(--border-radius-xl);
                display: flex;
                align-items: center;
                gap: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.05);
              ">
                <div style="
                  width: 32px;
                  height: 32px;
                  border-radius: var(--border-radius-full);
                  background-color: var(--primary-color);
                  color: white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: 600;
                  font-size: 0.85rem;
                ">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <span>
                  {user.name || 'Użytkowniku'}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                class="btn btn-secondary"
              >
                Wyloguj się
              </button>
            </div>
          </Show>
        </div>
      </div>
    </header>
  );
};

export default Header;