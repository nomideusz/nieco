import { createSignal } from "solid-js";
import habitStore from "../store/habitStore";

const HabitItem = (props) => {
  const { toggleHabitCompletion, removeHabit, setSelectedHabit } = habitStore;
  
  // Sprawdź, czy nawyk został już wykonany dzisiaj
  const today = new Date().toISOString().split('T')[0];
  const [isCompleted, setIsCompleted] = createSignal(
    props.habit.completedDates.includes(today)
  );
  
  // Funkcja do przełączania ukończenia nawyku
  const handleToggle = () => {
    toggleHabitCompletion(props.habit.id);
    setIsCompleted(!isCompleted());
  };
  
  // Funkcja do edycji nawyku
  const handleEdit = () => {
    setSelectedHabit(props.habit);
  };
  
  // Funkcja do usuwania nawyku
  const handleRemove = () => {
    if (confirm(`Czy na pewno chcesz usunąć nawyk "${props.habit.name}"?`)) {
      removeHabit(props.habit.id);
    }
  };
  
  return (
    <div class={`habit-item ${isCompleted() ? 'completed' : ''}`}>
      <div class="habit-header">
        <h3>{props.habit.name}</h3>
        <div class="habit-actions">
          <button 
            class="edit-btn" 
            onClick={handleEdit} 
            title="Edytuj nawyk"
          >
            ✏️
          </button>
          <button 
            class="delete-btn" 
            onClick={handleRemove} 
            title="Usuń nawyk"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <p class="habit-description">{props.habit.description}</p>
      
      <div class="habit-footer">
        <span class="habit-frequency">Częstotliwość: {props.habit.frequency}</span>
        <button
          class={`complete-btn ${isCompleted() ? 'active' : ''}`}
          onClick={handleToggle}
        >
          {isCompleted() ? '✓ Wykonane' : 'Oznacz jako wykonane'}
        </button>
      </div>
    </div>
  );
};

export default HabitItem;