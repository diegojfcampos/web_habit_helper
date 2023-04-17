interface HabitsProps {
    completed: number
}

export function Habit(props: HabitsProps) {
    return (
        <div className="bg-zinc-900 w-10 h-10 text-white rounded flex items-center justify-center">{props.completed}</div>
    )
}