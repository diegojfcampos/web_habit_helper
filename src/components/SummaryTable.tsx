import {useEffect, useState} from "react"
import { generateYearDates } from "../utils/generate-year-dates";
import { HabitDay } from "./HabitDay";
import {api} from "../lib/axios"
import dayjs from "dayjs";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
const summaryDates = generateYearDates()
const minimunSummaryDaySize = 18 * 7;
const amountOfDaysToFill = minimunSummaryDaySize - summaryDates.length;

type Summary = Array<{
    id: string;
    date: string;
    completed: number;
    amount: number;  
}>

export function SummaryTable(){

    const [summary, setSummary] = useState<Summary>([])

    useEffect(() => {
        api.get('/summary').then(response => {
            setSummary(response.data.summary)
            
        })
    }, [])
    
    return(
      <div className="w-full flex">
        <div className="grid grid-rows-7 grid-flow-row gap-3">
            {weekDays.map((weekDay, index) =>{
                return(
                    <div key={`${weekDay}-${index}`} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">{weekDay}</div>
                )
            })}        
        </div>

        <div className="grid grid-rows-7 grid-flow-col gap-3">            
            {summary.length > 0 && summaryDates.map(date => {
                const dayInSummary = summary.find(day => {
                    const formattedDate = dayjs(date).format('YYYY-MM-DD');
                    return dayjs(formattedDate).isSame(day.date, 'day')
                })
                return (                    
                    <HabitDay
                        key={date.toString()}
                        date={date}
                        amount={dayInSummary?.amount}  
                        defaultcompleted={dayInSummary?.completed}
                    />
                )
            })}

            {amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_, i) => {
                return <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>

            })}
        </div>

      </div> 
    )
}