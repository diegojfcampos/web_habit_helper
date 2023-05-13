import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import dayjs from 'dayjs';


interface HabitDayProps {
    date: Date
    completed?: number
    amount?: number
}

export function HabitDay({completed  = 0, amount = 0, date}: HabitDayProps) {
    const completePercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

    const dayAndMouth = dayjs(date).format('DD/MM')
    const dayOfWeek = dayjs(date).format('dddd')

    return (
        <Popover.Root>
            <Popover.Trigger className={clsx('w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg', {

                'bg-zinc-900 border-zinc-800' : completePercentage > 68 && completePercentage < 80,
                'bg-violet-900 border-violet-700' : completePercentage > 0 && completePercentage <200,
                'bg-violet-800 border-violet-600' : completePercentage > 28 && completePercentage < 40,
                'bg-violet-700 border-violet-500' : completePercentage > 48 && completePercentage < 60,
                'bg-violet-600 border-violet-500' : completePercentage > 68 && completePercentage < 80,
                'bg-violet-500 border-violet-400' : completePercentage > 80,
            })} 

            />

            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flec flex-col">
                    <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMouth}</span>

                    <ProgressBar progress={completePercentage}/>

                    <div className="mt-6 flex flex-col gap-3">
                        <Checkbox.Root className="flex  items-center gap-3 group">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                                <Checkbox.Indicator>
                                    <Check size={20} className="text-white" />
                                </Checkbox.Indicator>
                            </div>
                            
                            <span className="font-seibold text-2xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">Drink 2l water</span>
                        </Checkbox.Root>
                    </div>
                   
                    <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}