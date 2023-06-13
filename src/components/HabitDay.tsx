import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';
import { useEffect } from 'react';



interface HabitDayProps {
    date: Date
    defaultcompleted?: number
    amount?: number
}

}

export function HabitDay({ defaultcompleted = 0, amount = 0, date }: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultcompleted);
  const [completePercentage, setCompletePercentage] = useState(0);

  useEffect(() => {
    const percentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;
    setCompletePercentage(percentage);
  }, [completed, amount]);

  const dayAndMouth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  function handleCompletedChanged(completed: number) {
    setCompleted(completed);
  }

    return (
        <Popover.Root>
            <Popover.Trigger
                className={`w-10 h-10 rounded-lg ${
                completePercentage === 0
                  ? 'bg-zinc-900 border-zinc-800'
                  : completePercentage > 0 && completePercentage < 20
                  ? 'bg-violet-900 border-violet-700'
                  : completePercentage > 20 && completePercentage < 40
                  ? 'bg-violet-800 border-violet-600'
                  : completePercentage > 40 && completePercentage < 60
                  ? 'bg-violet-700 border-violet-500'
                  : completePercentage > 60 && completePercentage < 80
                  ? 'bg-violet-600 border-violet-500'
                  : 'bg-violet-500 border-violet-400'
                }`}
            />

            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
                    <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMouth}</span>

                    <ProgressBar progress={completePercentage}/>

                    <HabitsList  date={date} onCompletedChange={handleCompletedChanged}/>

                    <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}