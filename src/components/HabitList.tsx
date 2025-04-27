import { For, Show, JSX } from "solid-js";
import HabitItem from "./HabitItem";
import habitStore from "../store/habitStore";

const HabitList = (): JSX.Element => {
  const { habits } = habitStore;
  
  return (
    <div style="margin-top: 20px;">
      <Show when={habits.length > 0} fallback={
        <div style="
          text-align: center; 
          padding: 50px 20px; 
          background-color: var(--bg-light); 
          border-radius: var(--border-radius-lg); 
          border: 1px dashed var(--border-color);
          animation: fadeIn var(--transition-medium) forwards;
        ">
          <div style="
            width: 60px;
            height: 60px;
            border-radius: var(--border-radius-full);
            background-color: rgba(74, 111, 165, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px auto;
          ">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 8V16" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 12H16" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p style="margin: 0; color: var(--text-secondary); font-weight: 500; font-size: 1.1rem;">Nie masz jeszcze żadnych nawyków</p>
          <p style="margin: 8px 0 0 0; color: var(--text-muted); font-size: 0.9rem;">Dodaj swój pierwszy nawyk, używając formularza obok</p>
        </div>
      }>
        <div style="animation: fadeIn var(--transition-medium) forwards;">
          <For each={habits}>
            {(habit) => <HabitItem habit={habit} />}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default HabitList; 