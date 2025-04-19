import { For, Show } from "solid-js";
import habitStore from "../store/habitStore";
import HabitItem from "./HabitItem";

const HabitList = () => {
  const { habits } = habitStore;
  
  return (
    <div class="habit-list">
      <h2>Twoje mikro-nawyki</h2>
      
      <Show 
        when={habits.length > 0} 
        fallback={<p class="empty-list">Nie masz jeszcze żadnych nawyków. Dodaj swój pierwszy nawyk!</p>}
      >
        <div class="habits-container">
          <For each={habits.filter(h => h.active)}>
            {(habit) => <HabitItem habit={habit} />}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default HabitList;