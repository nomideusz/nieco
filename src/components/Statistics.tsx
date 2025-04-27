import { createSignal, createEffect, JSX } from "solid-js";
import habitStore from "../store/habitStore";

type StatsType = {
  totalHabits: number;
  activeHabits: number;
  completedToday: number;
  completionRate: number;
};

const Statistics = (): JSX.Element => {
  const { getStats, habits } = habitStore;
  const [stats, setStats] = createSignal<StatsType>({
    totalHabits: 0,
    activeHabits: 0,
    completedToday: 0,
    completionRate: 0
  });
  
  // Update stats whenever habits change
  createEffect(() => {
    // Using habits.length as a dependency to trigger the effect when habits change
    habits.length;
    setStats(getStats());
  });
  
  // Get color based on completion rate
  const getCompletionColor = () => {
    const rate = stats().completionRate;
    if (rate >= 80) return 'var(--success-color)';
    if (rate >= 50) return 'var(--info-color)';
    return 'var(--warning-color)';
  };
  
  return (
    <div class="card" style="padding: 24px;">
      <h2 style="
        margin-top: 0; 
        color: var(--primary-color); 
        border-bottom: 2px solid var(--border-color); 
        padding-bottom: 12px;
        font-size: 1.4rem;
        letter-spacing: 0.5px;
      ">
        Twoje statystyki
      </h2>
      
      {habits.length === 0 ? (
        <div style="
          text-align: center; 
          padding: 50px 0;
          background-color: var(--bg-light);
          border-radius: var(--border-radius-md);
          margin-top: 20px;
        ">
          <p style="color: var(--text-secondary); margin: 0 0 12px 0; font-size: 1.1rem; font-weight: 500;">
            Nie masz jeszcze żadnych nawyków
          </p>
          <p style="color: var(--text-muted); margin: 0; font-size: 0.9rem;">
            Dodaj swój pierwszy nawyk, aby zobaczyć statystyki
          </p>
        </div>
      ) : (
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 24px;">
          <div style="
            background-color: var(--bg-light); 
            padding: 24px; 
            border-radius: var(--border-radius-md); 
            text-align: center;
            box-shadow: var(--button-shadow);
            transition: all var(--transition-fast);
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 12px rgba(0,0,0,0.05);
            }
          ">
            <h3 style="margin: 0 0 6px 0; color: var(--text-secondary); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;">Wszystkie nawyki</h3>
            <p style="margin: 0; font-size: 2.4rem; font-weight: bold; color: var(--primary-color);">{stats().totalHabits}</p>
          </div>
          
          <div style="
            background-color: var(--bg-light); 
            padding: 24px; 
            border-radius: var(--border-radius-md); 
            text-align: center;
            box-shadow: var(--button-shadow);
            transition: all var(--transition-fast);
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 12px rgba(0,0,0,0.05);
            }
          ">
            <h3 style="margin: 0 0 6px 0; color: var(--text-secondary); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;">Aktywne nawyki</h3>
            <p style="margin: 0; font-size: 2.4rem; font-weight: bold; color: var(--info-color);">{stats().activeHabits}</p>
          </div>
          
          <div style="
            background-color: var(--bg-light); 
            padding: 24px; 
            border-radius: var(--border-radius-md); 
            text-align: center;
            box-shadow: var(--button-shadow);
            transition: all var(--transition-fast);
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 12px rgba(0,0,0,0.05);
            }
          ">
            <h3 style="margin: 0 0 6px 0; color: var(--text-secondary); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;">Ukończone dziś</h3>
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
              <p style="margin: 0; font-size: 2.4rem; font-weight: bold; color: var(--success-color);">
                {stats().completedToday}
              </p>
              <span style="color: var(--text-muted); font-size: 1.3rem; font-weight: 500;">/</span>
              <p style="margin: 0; font-size: 1.6rem; font-weight: bold; color: var(--text-secondary);">
                {stats().activeHabits}
              </p>
            </div>
          </div>
          
          <div style="
            background-color: var(--bg-light); 
            padding: 24px; 
            border-radius: var(--border-radius-md); 
            text-align: center;
            box-shadow: var(--button-shadow);
            transition: all var(--transition-fast);
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 12px rgba(0,0,0,0.05);
            }
          ">
            <h3 style="margin: 0 0 6px 0; color: var(--text-secondary); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;">Skuteczność</h3>
            <div style="position: relative; width: 100%; height: 80px; display: flex; align-items: center; justify-content: center;">
              <div style={`
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: conic-gradient(
                  ${getCompletionColor()} ${stats().completionRate}%, 
                  #f0f0f0 ${stats().completionRate}%
                );
                display: flex;
                align-items: center;
                justify-content: center;
              `}>
                <div style="
                  width: 60px;
                  height: 60px;
                  border-radius: 50%;
                  background-color: white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                ">
                  <span style={`margin: 0; font-size: 1.5rem; font-weight: bold; color: ${getCompletionColor()};`}>
                    {stats().completionRate}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics; 