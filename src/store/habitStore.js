import { createSignal, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { nanoid } from "nanoid";

// Funkcja do wczytywania nawyków z localStorage
function loadHabits() {
  const saved = localStorage.getItem("habits");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Błąd wczytywania nawyków:", e);
    }
  }
  return [];
}

// Tworzenie i eksportowanie stanu aplikacji
export function createHabitStore() {
  // Wczytaj nawyki lub inicjuj pustą tablicę
  const [habits, setHabits] = createStore(loadHabits());
  
  // Sygnał dla obecnie wybranego nawyku (do edycji)
  const [selectedHabit, setSelectedHabit] = createSignal(null);
  
  // Zapisuj nawyki przy każdej zmianie
  createEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  });

  // Funkcje do zarządzania nawykami
  const addHabit = (name, description, frequency) => {
    const newHabit = {
      id: nanoid(),
      name,
      description,
      frequency,
      createdAt: new Date().toISOString(),
      completedDates: [],
      active: true
    };
    
    setHabits([...habits, newHabit]);
    return newHabit;
  };

  const toggleHabitCompletion = (habitId, date = new Date().toISOString().split('T')[0]) => {
    const habitIndex = habits.findIndex(h => h.id === habitId);
    
    if (habitIndex >= 0) {
      const habit = habits[habitIndex];
      const completedDates = [...habit.completedDates];
      
      const dateIndex = completedDates.indexOf(date);
      if (dateIndex >= 0) {
        // Jeśli nawyk został już ukończony, usuń datę
        completedDates.splice(dateIndex, 1);
      } else {
        // W przeciwnym razie dodaj datę ukończenia
        completedDates.push(date);
      }
      
      setHabits(habitIndex, "completedDates", completedDates);
    }
  };

  const removeHabit = (habitId) => {
    setHabits(habits.filter(h => h.id !== habitId));
  };

  const updateHabit = (habitId, updates) => {
    const habitIndex = habits.findIndex(h => h.id === habitId);
    if (habitIndex >= 0) {
      setHabits(habitIndex, { ...updates });
    }
  };

  // Statystyki
  const getStats = () => {
    const totalHabits = habits.length;
    const activeHabits = habits.filter(h => h.active).length;
    const today = new Date().toISOString().split('T')[0];
    
    const completedToday = habits.filter(h => 
      h.active && h.completedDates.includes(today)
    ).length;
    
    const completionRate = activeHabits > 0 
      ? Math.round((completedToday / activeHabits) * 100) 
      : 0;
    
    return {
      totalHabits,
      activeHabits,
      completedToday,
      completionRate
    };
  };

  return {
    habits,
    selectedHabit,
    setSelectedHabit,
    addHabit,
    removeHabit,
    updateHabit,
    toggleHabitCompletion,
    getStats
  };
}

// Singleton instancja magazynu
const habitStore = createHabitStore();
export default habitStore;