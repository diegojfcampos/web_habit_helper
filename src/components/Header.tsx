import { Plus } from "phosphor-react"
import logoImagem from '../assets/logo.svg'

export function Header(){
    return(
        <div className="w-full max-w-3xl mx-auto flex flex-center justify-between">
        <img src={logoImagem} alt="Logo"/>
        <button 
        type="button" 
        className="border border-violet-500 font-semibold rounded-l-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300"
        >        
        <Plus size={20} className="text-violet-500"/>
        New Habit</button>
    </div>
    )
}