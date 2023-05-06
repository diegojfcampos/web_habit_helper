import { Plus, X } from "phosphor-react"
import { useState } from "react";
import logoImagem from '../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog';
import { NewHabitForm } from "./NewHabitForm";

export function Header(){

    return(
        <div className="w-full max-w-3xl mx-auto flex flex-center justify-between">
        <img src={logoImagem} alt="Logo"/>
       <Dialog.Root>
            <Dialog.Trigger 
                type="button"                 
                className="border border-violet-500 font-semibold rounded-l-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300"
            >        
            <Plus size={20} className="text-violet-500"/>
                New Habit
            </Dialog.Trigger >
            <Dialog.Portal>
                <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0"/>
                <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Dialog.Close className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200">
                        <X size={10} aria-label="Close"/>
                    </Dialog.Close>
                
                <Dialog.Title className="text-3xL leading-tight font-extrabold" >
                    Create a New Habit
                </Dialog.Title> 
                
                <NewHabitForm/>
                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>
    </div>
    )
}