import { Check } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormEvent } from 'react';
import { useState } from 'react';
import { api } from '../lib/axios';


const availableWeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export function NewHabitForm(){

    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    async function createNewhabit(event: FormEvent){
        event.preventDefault();
        
        if(!title || weekDays.length ===0 ) return

        const response = await api.post('/habits', {
            title,
            weekDays,        
        })

        if (response.data.message === "Habit Already Exists") {
            alert('Habit Already Exists')
            return;
          }

        setTitle('')
        setWeekDays([])

        alert('Habit created successfully!')
    }

    function handleToogleWeekDay(weekDay: number){
        if(weekDays.includes(weekDay)){
            const weekDaysWitthRemovedOnes = weekDays.filter(day => day === weekDay)
            setWeekDays(weekDaysWitthRemovedOnes)
        }else{
            const weekDaysWitthAddedOnes = [...weekDays, weekDay]
            setWeekDays(weekDaysWitthAddedOnes)
        }
    }

    return(
        <form onSubmit={createNewhabit} className="w-full flex flex-col mt-6">
            <label htmlFor="habit" className="font-semibold leading-tight">What's your commitment?</label>
            <input 
                className="font-bold p-4 rounded-lg bg-zinc-800 text-white text-xl placeholder:text-zinc-400" 
                type="text" id="title" 
                placeholder="gym, study 3h, sleep 8h, etc..." 
                autoFocus
                value={title}
                onChange={event => setTitle(event.target.value)}
            >
            </input> 
            <label className="font-semibold leading-tight mt-4 " htmlFor=""> Frequency</label>
            <div className="flex flex-col gap-2 mt-3">
                {availableWeekDays.map((weekDay, index) => {
                    return(
                        <Checkbox.Root 
                            key={weekDay} 
                            className="flex  items-center gap-3 group"
                            checked={weekDays.includes(index)}
                            onCheckedChange={() => handleToogleWeekDay(index)}
                        >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                                <Checkbox.Indicator>
                                    <Check size={20} className="text-white" />
                                </Checkbox.Indicator>
                            </div>
                    
                            <span className=" text-white leading-tight">{weekDay}</span>
                        </Checkbox.Root>
                    )
                })}                
                
            </div>
            <button className="mt-6 rounded-lg p-4 flex items-center gap-3 font-semibold bg-green-600 justify-center hover:bg-green-500" type="submit"><Check size={28} weight="bold"/>Confirm</button>     
        </form>
    )
}
