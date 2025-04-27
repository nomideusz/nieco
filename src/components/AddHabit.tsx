import { createSignal, createEffect, Show, JSX } from "solid-js";
import habitStore from "../store/habitStore";

const AddHabit = (): JSX.Element => {
  const { addHabit, selectedHabit, setSelectedHabit, updateHabit } = habitStore;
  
  const [name, setName] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [frequency, setFrequency] = createSignal("daily");
  const [error, setError] = createSignal("");
  const [isEditing, setIsEditing] = createSignal(false);
  
  // Efekt do obsługi edycji nawyku
  createEffect(() => {
    const habit = selectedHabit();
    if (habit) {
      setName(habit.name);
      setDescription(habit.description);
      setFrequency(habit.frequency);
      setIsEditing(true);
    }
  });
  
  // Resetowanie formularza
  const resetForm = () => {
    setName("");
    setDescription("");
    setFrequency("daily");
    setError("");
    setIsEditing(false);
    setSelectedHabit(null);
  };
  
  // Obsługa przesłania formularza
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    
    // Walidacja
    if (!name().trim()) {
      setError("Nazwa nawyku jest wymagana");
      return;
    }
    
    if (isEditing()) {
      // Aktualizacja istniejącego nawyku
      const habit = selectedHabit();
      if (habit) {
        updateHabit(habit.id, {
          name: name(),
          description: description(),
          frequency: frequency()
        });
        
        // Wyświetl komunikat o powodzeniu
        alert(`Nawyk "${name()}" został zaktualizowany!`);
      }
    } else {
      // Dodawanie nowego nawyku
      addHabit(name(), description(), frequency());
      
      // Wyświetl komunikat o powodzeniu
      alert(`Nawyk "${name()}" został dodany!`);
    }
    
    // Resetuj formularz
    resetForm();
  };
  
  // Anulowanie edycji
  const handleCancel = () => {
    resetForm();
  };
  
  return (
    <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h2 style="margin-top: 0; color: #4a6fa5; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
        {isEditing() ? 'Edytuj nawyk' : 'Dodaj nowy nawyk'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style="margin-bottom: 15px;">
          <label 
            for="habit-name" 
            style="display: block; margin-bottom: 5px; font-weight: 500; color: #555;"
          >
            Nazwa nawyku:
          </label>
          <input
            id="habit-name"
            type="text"
            value={name()}
            onInput={(e: InputEvent) => setName((e.target as HTMLInputElement).value)}
            placeholder="Np. Wypij szklankę wody po przebudzeniu"
            style="width: 100%; padding: 10px; border: 1px solid #e0e0e0; border-radius: 4px; font-size: 1rem;"
          />
        </div>
        
        <div style="margin-bottom: 15px;">
          <label 
            for="habit-description"
            style="display: block; margin-bottom: 5px; font-weight: 500; color: #555;"
          >
            Opis (opcjonalny):
          </label>
          <textarea
            id="habit-description"
            value={description()}
            onInput={(e: InputEvent) => setDescription((e.target as HTMLTextAreaElement).value)}
            placeholder="Opisz, dlaczego ten nawyk jest dla Ciebie ważny"
            style="width: 100%; padding: 10px; border: 1px solid #e0e0e0; border-radius: 4px; font-size: 1rem; min-height: 80px; resize: vertical;"
            rows="3"
          />
        </div>
        
        <div style="margin-bottom: 20px;">
          <label 
            for="habit-frequency"
            style="display: block; margin-bottom: 5px; font-weight: 500; color: #555;"
          >
            Częstotliwość:
          </label>
          <select
            id="habit-frequency"
            value={frequency()}
            onChange={(e: Event) => setFrequency((e.target as HTMLSelectElement).value)}
            style="width: 100%; padding: 10px; border: 1px solid #e0e0e0; border-radius: 4px; font-size: 1rem; background-color: white;"
          >
            <option value="daily">Codziennie</option>
            <option value="weekdays">W dni powszednie</option>
            <option value="weekends">W weekendy</option>
            <option value="weekly">Raz w tygodniu</option>
          </select>
        </div>
        
        <Show when={error()}>
          <p style="color: #e74c3c; margin-bottom: 15px; font-size: 0.9rem;">{error()}</p>
        </Show>
        
        <div style="display: flex; gap: 10px; justify-content: flex-end;">
          <Show when={isEditing()}>
            <button 
              type="button" 
              onClick={handleCancel}
              style="padding: 10px 20px; background-color: #f5f5f5; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; color: #666;"
            >
              Anuluj
            </button>
          </Show>
          
          <button 
            type="submit" 
            style="padding: 10px 20px; background-color: #4a6fa5; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: 500;"
          >
            {isEditing() ? 'Zapisz zmiany' : 'Dodaj nawyk'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHabit; 