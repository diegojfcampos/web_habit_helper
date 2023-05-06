import { Check } from 'phosphor-react'

export function NewHabitForm(){
    return(
        <form className="w-full flex flex-col mt-6">
            <label htmlFor="habit">What's your commitment?</label>
            <input className="p-4 rounded-lg bg-size-800 text-white placeholder:text-zinc-400" type="text" id="title" placeholder="gym, study 3h, sleep 8h, etc..." autoFocus></input> 
            <label className="font-semibold leading-tight mt-4 " htmlFor=""> Frequency</label>
            <button className="mt-6 rounded-lg p-4 flex items-center gap-3 font-semibold bg-green-600 justify-center hover:bg-green-500" type="submit"><Check size={28} weight="bold"/>Confirm</button>     
        </form>
    )
}
