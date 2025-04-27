import { createSignal, Show, JSX } from "solid-js";
import habitStore from "../store/habitStore";

type Habit = {
  id: string;
  name: string;
  description: string;
  frequency: string;
  createdAt: string;
  completedDates: string[];
  active: boolean;
};

type HabitItemProps = {
  habit: Habit;
};

const HabitItem = (props: HabitItemProps): JSX.Element => {
  const { toggleHabitCompletion, removeHabit, setSelectedHabit, updateHabit } = habitStore;
  
  const [isExpanded, setIsExpanded] = createSignal(false);
  const [showConfirmDelete, setShowConfirmDelete] = createSignal(false);
  
  // Get dates for the current week (Monday to Sunday)
  const getWeekDates = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = day === 0 ? 6 : day - 1; // Adjust for starting week on Monday (0 = Sunday)
    
    const monday = new Date(today);
    monday.setDate(today.getDate() - diff);
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date.toISOString().split('T')[0]);
    }
    
    return weekDates;
  };

  // Calculate how many days in the current week the habit has been completed
  const getWeeklyCompletion = () => {
    const dates = getWeekDates();
    let completedCount = 0;
    
    for (const date of dates) {
      if (props.habit.completedDates.includes(date)) {
        completedCount++;
      }
    }
    
    return { completed: completedCount, total: dates.length };
  };
  
  // Toggle habit active status
  const toggleActive = (e: Event) => {
    e.stopPropagation();
    updateHabit(props.habit.id, { active: !props.habit.active });
  };
  
  // Handle editing the habit
  const handleEdit = (e: Event) => {
    e.stopPropagation();
    setSelectedHabit(props.habit);
  };
  
  // Handle deleting the habit
  const handleDelete = (e: Event) => {
    e.stopPropagation();
    setShowConfirmDelete(true);
  };
  
  // Confirm deletion
  const confirmDelete = (e: Event) => {
    e.stopPropagation();
    removeHabit(props.habit.id);
    setShowConfirmDelete(false);
  };
  
  // Cancel deletion
  const cancelDelete = (e: Event) => {
    e.stopPropagation();
    setShowConfirmDelete(false);
  };
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded());
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Check if the habit should be completed on a particular day based on frequency
  const shouldCompleteOnDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    
    switch (props.habit.frequency) {
      case 'daily':
        return true;
      case 'weekdays':
        return day > 0 && day < 6;
      case 'weekends':
        return day === 0 || day === 6;
      case 'weekly':
        // For weekly habits, we'll use Monday as the default day
        return day === 1;
      default:
        return true;
    }
  };
  
  // Handle toggling completion for a specific date
  const handleToggleCompletion = (date: string, e: Event) => {
    e.stopPropagation();
    toggleHabitCompletion(props.habit.id, date);
  };
  
  const weekDates = getWeekDates();
  const weeklyCompletion = getWeeklyCompletion();
  const weeklyRate = Math.round((weeklyCompletion.completed / weeklyCompletion.total) * 100);
  
  // Get a color for the habit based on completion rate
  const getProgressColor = () => {
    if (weeklyRate >= 80) return 'var(--success-color)'; // Green for high completion
    if (weeklyRate >= 50) return 'var(--info-color)'; // Blue for medium completion
    return 'var(--warning-color)'; // Orange for low completion
  };
  
  return (
    <div class="card"
      style={`
        border-left: 5px solid ${props.habit.active ? getProgressColor() : 'var(--border-color)'};
        cursor: pointer;
        ${isExpanded() ? 'transform: scale(1.01);' : ''}
      `}
      onClick={toggleExpanded}
    >
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h3 style={`
            margin: 0; 
            font-size: 1.1rem;
            color: ${props.habit.active ? 'var(--text-primary)' : 'var(--text-muted)'};
            ${!props.habit.active ? 'text-decoration: line-through;' : ''}
            font-weight: 600;
            transition: color var(--transition-medium);
          `}>
            {props.habit.name}
          </h3>
          <p style="margin: 5px 0 0 0; font-size: 0.85rem; color: var(--text-secondary); font-weight: 500;">
            {getFrequencyText(props.habit.frequency)}
          </p>
        </div>
        <div style="display: flex; align-items: center; gap: 15px;">
          <div style="display: flex; align-items: center; position: relative;">
            <div style={`
              width: 42px;
              height: 42px;
              border-radius: var(--border-radius-full);
              background: conic-gradient(
                ${getProgressColor()} ${weeklyRate}%, 
                #f0f0f0 ${weeklyRate}%
              );
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
            `}>
              <div style="
                width: 32px;
                height: 32px;
                border-radius: var(--border-radius-full);
                background-color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 0.85rem;
                color: var(--text-secondary);
              ">
                {weeklyCompletion.completed}/{weeklyCompletion.total}
              </div>
            </div>
          </div>
          <button 
            onClick={toggleActive} 
            style={`
              background-color: ${props.habit.active ? 'rgba(74, 111, 165, 0.1)' : 'rgba(240, 240, 240, 0.5)'}; 
              color: ${props.habit.active ? 'var(--primary-color)' : 'var(--text-muted)'};
              padding: 6px 12px;
              border-radius: var(--border-radius-xl);
              font-size: 0.75rem;
              font-weight: 600;
              letter-spacing: 0.3px;
              text-transform: uppercase;
              box-shadow: ${props.habit.active ? 'var(--button-shadow)' : 'none'};
            `}
            title={props.habit.active ? 'Oznacz jako nieaktywny' : 'Oznacz jako aktywny'}
          >
            {props.habit.active ? 'Aktywny' : 'Nieaktywny'}
          </button>
        </div>
      </div>
      
      <Show when={isExpanded()}>
        <div style="
          margin-top: 18px; 
          border-top: 1px solid var(--border-color); 
          padding-top: 18px;
          animation: slideDown var(--transition-medium) forwards;
        ">
          <Show when={props.habit.description}>
            <div style="margin-bottom: 16px;">
              <h4 style="margin: 0 0 6px 0; color: var(--text-secondary); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Opis:</h4>
              <p style="margin: 0; color: var(--text-secondary); line-height: 1.5; font-size: 0.95rem;">{props.habit.description}</p>
            </div>
          </Show>
          
          <div style="margin-bottom: 16px;">
            <h4 style="margin: 0 0 6px 0; color: var(--text-secondary); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Utworzono:</h4>
            <p style="margin: 0; color: var(--text-secondary); font-size: 0.95rem;">{formatDate(props.habit.createdAt)}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h4 style="margin: 0 0 12px 0; color: var(--text-secondary); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Aktualny tydzień:</h4>
            <div style="display: flex; gap: 8px; justify-content: space-between;">
              {weekDates.map((date) => {
                const dayNames = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'];
                const dayIndex = weekDates.indexOf(date);
                const isCompleted = props.habit.completedDates.includes(date);
                const shouldComplete = shouldCompleteOnDate(date);
                const isToday = date === new Date().toISOString().split('T')[0];
                
                return (
                  <div style="text-align: center;">
                    <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 6px; font-weight: 500;">{dayNames[dayIndex]}</div>
                    <button 
                      onClick={[handleToggleCompletion, date]}
                      style={`
                        width: 36px;
                        height: 36px;
                        border-radius: var(--border-radius-full);
                        border: ${isToday ? '2px solid var(--primary-color)' : '1px solid var(--border-color)'};
                        background-color: ${isCompleted ? getProgressColor() : 'white'};
                        color: ${isCompleted ? 'white' : 'var(--text-secondary)'};
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        opacity: ${shouldComplete ? '1' : '0.5'};
                        font-weight: 600;
                        font-size: 0.8rem;
                        box-shadow: ${isCompleted ? 'var(--button-shadow)' : 'none'};
                      `}
                      disabled={!shouldComplete}
                      title={`${formatDate(date)}${!shouldComplete ? ' - Ten dzień nie jest częścią twojego planu' : ''}`}
                    >
                      {date.split('-')[2]}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div style="display: flex; gap: 10px; justify-content: flex-end;">
            <Show when={showConfirmDelete()}>
              <div style="
                display: flex; 
                gap: 10px; 
                margin-right: auto; 
                background-color: rgba(231, 76, 60, 0.05); 
                padding: 8px 12px; 
                border-radius: var(--border-radius-md); 
                border: 1px solid rgba(231, 76, 60, 0.2);
                animation: fadeIn var(--transition-fast) forwards;
              ">
                <span style="color: var(--text-secondary); font-size: 0.9rem; display: flex; align-items: center;">Usunąć nawyk?</span>
                <button 
                  onClick={confirmDelete}
                  class="btn btn-danger"
                >
                  Tak
                </button>
                <button 
                  onClick={cancelDelete}
                  class="btn btn-secondary"
                >
                  Nie
                </button>
              </div>
            </Show>
            
            <button 
              onClick={handleEdit}
              class="btn btn-primary"
            >
              Edytuj
            </button>
            <button 
              onClick={handleDelete}
              class="btn btn-secondary"
            >
              Usuń
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
};

// Pomocnicza funkcja do generowania tekstów dla częstotliwości
function getFrequencyText(frequency: string): string {
  switch (frequency) {
    case 'daily':
      return 'Codziennie';
    case 'weekdays':
      return 'W dni powszednie (Pon-Pt)';
    case 'weekends':
      return 'W weekendy (Sob-Niedz)';
    case 'weekly':
      return 'Raz w tygodniu (Poniedziałek)';
    default:
      return frequency;
  }
}

export default HabitItem; 