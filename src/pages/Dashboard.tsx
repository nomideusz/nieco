import { createSignal, Show, onMount } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import AddHabit from '../components/AddHabit';
import HabitList from '../components/HabitList';
import Statistics from '../components/Statistics';
import LoginTest from '../components/LoginTest';
import habitStore from '../store/habitStore';
import userStore from '../store/userStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { habits } = habitStore;
  const { user, setIsLoginModalOpen } = userStore;
  
  const [activeTab, setActiveTab] = createSignal('habits');

  // Check if user is authenticated and show login modal if not
  onMount(() => {
    if (!user.isLoggedIn) {
      setIsLoginModalOpen(true);
    }
  });

  // When not logged in, show login message
  if (!user.isLoggedIn) {
    return (
      <div class="card" style="
        padding: 40px 30px; 
        text-align: center; 
        max-width: 600px;
        margin: 60px auto 0;
        animation: fadeIn var(--transition-medium) forwards;
      ">
        <div style="
          width: 80px;
          height: 80px;
          border-radius: var(--border-radius-full);
          background-color: rgba(74, 111, 165, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        ">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L12 14" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 18V20" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round"/>
            <path d="M4.93 10.93C4.00239 11.8576 3.35828 13.0129 3.07144 14.2726C2.7846 15.5322 2.8649 16.8525 3.3034 18.0657C3.7419 19.2789 4.52176 20.3346 5.55522 21.1059C6.58868 21.8771 7.83046 22.3313 9.115 22.415C10.3995 22.4986 11.6885 22.2088 12.8346 21.5777C13.9807 20.9467 14.9438 20.0021 15.6133 18.8457C16.2829 17.6894 16.6329 16.3663 16.6239 15.0209C16.6149 13.6755 16.2473 12.3582 15.562 11.212" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <h1 style="
          font-size: 1.8rem; 
          color: var(--text-primary);
          margin-bottom: 16px;
        ">Dostęp ograniczony</h1>
        <p style="
          margin: 0 0 30px; 
          color: var(--text-secondary); 
          line-height: 1.6;
          font-size: 1rem;
        ">
          Aby zobaczyć swój panel, musisz się zalogować. Kliknij przycisk poniżej, aby się zalogować lub zarejestrować.
        </p>
        <button 
          onClick={() => setIsLoginModalOpen(true)}
          class="btn btn-primary"
        >
          Zaloguj się
        </button>
        
        <LoginTest />
      </div>
    );
  }

  return (
    <div style="
      padding: 20px;
      animation: fadeIn var(--transition-medium) forwards;
    ">
      <h1 style="
        color: var(--text-primary);
        font-size: 1.8rem;
        margin-bottom: 24px;
        font-weight: 700;
      ">Panel użytkownika</h1>
      
      <LoginTest />
      
      {/* Tabs */}
      <div style="
        display: flex; 
        margin-bottom: 30px; 
        border-bottom: 1px solid var(--border-color);
        padding-left: 8px;
      ">
        <button 
          onClick={() => setActiveTab('habits')}
          style={`
            padding: 12px 24px; 
            border: none; 
            background: none; 
            cursor: pointer; 
            font-weight: ${activeTab() === 'habits' ? '600' : 'normal'}; 
            color: ${activeTab() === 'habits' ? 'var(--primary-color)' : 'var(--text-secondary)'};
            border-bottom: ${activeTab() === 'habits' ? '3px solid var(--primary-color)' : 'none'};
            transition: all var(--transition-fast);
            font-size: 1rem;
          `}
        >
          Moje nawyki
        </button>
        <button 
          onClick={() => setActiveTab('stats')}
          style={`
            padding: 12px 24px; 
            border: none; 
            background: none; 
            cursor: pointer; 
            font-weight: ${activeTab() === 'stats' ? '600' : 'normal'}; 
            color: ${activeTab() === 'stats' ? 'var(--primary-color)' : 'var(--text-secondary)'};
            border-bottom: ${activeTab() === 'stats' ? '3px solid var(--primary-color)' : 'none'};
            transition: all var(--transition-fast);
            font-size: 1rem;
          `}
        >
          Statystyki
        </button>
      </div>
      
      {/* Content based on active tab */}
      <Show when={activeTab() === 'habits'}>
        <div style="
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 30px;
        ">
          <div class="card" style="padding: 30px; height: fit-content;">
            <h2 style="
              color: var(--primary-color);
              font-size: 1.4rem;
              margin-top: 0;
              margin-bottom: 20px;
              border-bottom: 2px solid var(--border-color);
              padding-bottom: 12px;
            ">Dodaj nawyk</h2>
            <AddHabit />
          </div>
          <div>
            <h2 style="
              color: var(--primary-color);
              font-size: 1.4rem;
              margin-top: 0;
              margin-bottom: 20px;
              padding-left: 5px;
            ">Twoje nawyki</h2>
            <HabitList />
          </div>
        </div>
      </Show>
      
      <Show when={activeTab() === 'stats'}>
        <Statistics />
      </Show>
    </div>
  );
};

export default Dashboard;
