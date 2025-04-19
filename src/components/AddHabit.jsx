import { createSignal, Show } from "solid-js";
import habitStore from "../store/habitStore";

const AddHabit = () => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Walidacja
    if (!name().trim()) {
      setError("Nazwa nawyku jest wymagana");
      return;
    }
    
    if (isEditing()) {
      // Aktualizacja istniejącego nawyku
      updateHabit(selectedHabit().id, {
        name: name(),
        description: description(),
        frequency: frequency()
      });
      
      // Wyświetl komunikat o powodzeniu
      alert(`Nawyk "${name()}" został zaktualizowany!`);
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
    <div class="add-habit-container">
      <h2>{isEditing() ? 'Edytuj nawyk' : 'Dodaj nowy mikro-nawyk'}</h2>
      
      <form onSubmit={handleSubmit} class="habit-form">
        <div class="form-group">
          <label for="habit-name">Nazwa nawyku:</label>
          <input
            id="habit-name"
            type="text"
            value={name()}
            onInput={(e) => setName(e.target.value)}
            placeholder="Np. Wypij szklankę wody po przebudzeniu"
          />
        </div>
        
        <div class="form-group">
          <label for="habit-description">Opis (opcjonalny):</label>
          <textarea
            id="habit-description"
            value={description()}
            onInput={(e) => setDescription(e.target.value)}
            placeholder="Opisz, dlaczego ten nawyk jest dla Ciebie ważny"
            rows="3"
          />
        </div>
        
        <div class="form-group">
          <label for="habit-frequency">Częstotliwość:</label>
          <select
            id="habit-frequency"
            value={frequency()}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="daily">Codziennie</option>
            <option value="weekdays">W dni powszednie</option>
            <option value="weekends">W weekendy</option>
            <option value="weekly">Raz w tygodniu</option>
          </select>
        </div>
        
        <Show when={error()}>
          <p class="error-message">{error()}</p>
        </Show>
        
        <div class="form-actions">
          <Show when={isEditing()}>
            <button type="button" class="cancel-btn" onClick={handleCancel}>
              Anuluj
            </button>
          </Show>
          
          <button type="submit" class="submit-btn">
            {isEditing() ? 'Zapisz zmiany' : 'Dodaj nawyk'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHabit;