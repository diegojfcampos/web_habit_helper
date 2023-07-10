import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import dayjs from 'dayjs';


interface HabitsListProps {
    date: Date;
    onCompletedChange?: (completed: number) => void;
}

interface HabitsInfo {
    possibleHabits: {
        id: string;
        title: string;
        created_at: string;
    }[],
    completedHabits: string[]
}

const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  export function HabitsList({ date, onCompletedChange }: HabitsListProps) {
    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo | null>(null);
  
    useEffect(() => {
      // Recupera os hábitos concluídos do armazenamento local (local storage)
      const completedHabitsFromStorage = localStorage.getItem('completedHabits');
      const completedHabits = completedHabitsFromStorage ? JSON.parse(completedHabitsFromStorage) : [];
  
      api.get('/day', {
        params: {
          date: date.toISOString(),
        },
      }).then((response) => {
        const habitsData = response.data;
  
        setHabitsInfo({
          possibleHabits: habitsData.possibleHabits,
          completedHabits: completedHabits,
        });
      });
    }, [date]);
  
    async function handleToggleHabit(habitId: string) {
      if (!habitsInfo) return; 
  
      const isHabitCompleted = habitsInfo.completedHabits.includes(habitId);
      let completedHabits: string[] = [];
  
      await api.patch(`/habits/${habitId}/toggle`, null, requestOptions);
  
      if (isHabitCompleted) {
        completedHabits = habitsInfo.completedHabits.filter((habit) => habit !== habitId);
      } else {
        completedHabits = [...habitsInfo.completedHabits, habitId];
      }
  
      
      setHabitsInfo({
        possibleHabits: habitsInfo.possibleHabits,
        completedHabits: completedHabits,
      });
      localStorage.setItem('completedHabits', JSON.stringify(completedHabits));
  
      onCompletedChange!(completedHabits.length);
    }
    const isDateInPast = dayjs(date).endOf("day").isBefore(new Date())

    return (

        <div className="mt-6 flex flex-col gap-3">
            {habitsInfo?.possibleHabits.map(habit => {
                return(
                    <Checkbox.Root 
                        key={habit.id}
                        onCheckedChange={() => handleToggleHabit(habit.id)}
                        className="flex items-center gap-3 group"
                        disabled={isDateInPast}
                        checked={habitsInfo.completedHabits.includes(habit.id)}
                        
                    >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                        <Checkbox.Indicator>
                            <Check size={20} className="text-white" />
                        </Checkbox.Indicator>
                    </div>
                    
                    <span className="font-seibold text-2xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">{habit.title}</span>
                </Checkbox.Root>                )

            })}
            
        </div>
    )
}