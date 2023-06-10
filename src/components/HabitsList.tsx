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

export function HabitsList({ date, onCompletedChange }: HabitsListProps) {

    const[habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

    useEffect(() => {
        api.get('/day', {
            params: {
                date: date.toISOString()
            }
        }).then(response => {
            setHabitsInfo(response.data)
        })
    }, [])

    async function handleToggleHabit(habitId: string){
        const isHabitCompleted = habitsInfo!.completedHabits.includes(habitId)        
        let completedHabits: string[] = []

        await api.patch(`/habits/${habitId}/toggle`)

        if(isHabitCompleted){           
            completedHabits = habitsInfo!.completedHabits.filter(habit => habit !== habitId)
        }else{
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }

        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits: completedHabits
        })

        onCompletedChange!(completedHabits.length)

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
                        //disabled={isDateInPast}
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