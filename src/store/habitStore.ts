import { createSignal, createEffect, createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import { nanoid } from "nanoid";
import userStore from "./userStore";

type Habit = {
  id: string;
  name: string;
  description: string;
  frequency: string;
  createdAt: string;
  completedDates: string[];
  active: boolean;
  userId?: string;
};

type HabitStats = {
  totalHabits: number;
  activeHabits: number;
  completedToday: number;
  completionRate: number;
};

interface HabitStore {
  habits: Habit[];
  selectedHabit: () => Habit | null;
  setSelectedHabit: (habit: Habit | null) => void;
  addHabit: (name: string, description: string, frequency: string) => Habit;
  removeHabit: (habitId: string) => void;
  updateHabit: (habitId: string, updates: Partial<Habit>) => void;
  toggleHabitCompletion: (habitId: string, date?: string) => void;
  getStats: () => HabitStats;
}

// Funkcja do wczytywania nawyków z localStorage
function loadHabits(): Habit[] {
  if (typeof window === 'undefined') return [];
  
  const userId = userStore.user.id || 'guest';
  const key = `habits_${userId}`;
  const saved = localStorage.getItem(key);
  
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
export function createHabitStore(): HabitStore {
  // Wczytaj nawyki lub inicjuj pustą tablicę
  const [habits, setHabits] = createStore<Habit[]>(loadHabits());
  
  // Sygnał dla obecnie wybranego nawyku (do edycji)
  const [selectedHabit, setSelectedHabit] = createSignal<Habit | null>(null);
  
  // Wrap effects in createRoot to ensure proper disposal
  createRoot(() => {
    // Zapisuj nawyki przy każdej zmianie
    createEffect(() => {
      if (typeof window === 'undefined') return;
      
      const userId = userStore.user.id || 'guest';
      const key = `habits_${userId}`;
      localStorage.setItem(key, JSON.stringify(habits));
    });

    // Reset habits when user changes
    createEffect(() => {
      // Watch for user changes
      const userId = userStore.user.id;
      // Load habits for the current user
      setHabits(loadHabits());
    });
  });

  // Funkcje do zarządzania nawykami
  const addHabit = (name: string, description: string, frequency: string): Habit => {
    const newHabit: Habit = {
      id: nanoid(),
      name,
      description,
      frequency,
      createdAt: new Date().toISOString(),
      completedDates: [],
      active: true,
      userId: userStore.user.id || 'guest'
    };
    
    setHabits([...habits, newHabit]);
    return newHabit;
  };

  const toggleHabitCompletion = (habitId: string, date: string = new Date().toISOString().split('T')[0]) => {
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

  const removeHabit = (habitId: string) => {
    setHabits(habits.filter(h => h.id !== habitId));
  };

  const updateHabit = (habitId: string, updates: Partial<Habit>) => {
    const habitIndex = habits.findIndex(h => h.id === habitId);
    if (habitIndex >= 0) {
      setHabits(habitIndex, { ...updates });
    }
  };

  // Statystyki
  const getStats = (): HabitStats => {
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
const habitStore: HabitStore = createHabitStore();
export default habitStore; 