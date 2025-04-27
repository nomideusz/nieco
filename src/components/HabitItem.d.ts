import { JSX } from 'solid-js';

type HabitItemProps = {
  habit: {
    id: string;
    name: string;
    description: string;
    frequency: string;
    completedDates: string[];
    active: boolean;
    createdAt: string;
  };
};

declare const HabitItem: (props: HabitItemProps) => JSX.Element;
export default HabitItem; 