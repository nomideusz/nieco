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

declare const habitStore: HabitStore;
export default habitStore;

export function createHabitStore(): HabitStore; 