import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'
import './styles/global.css'
import * as ScrollArea from '@radix-ui/react-scroll-area';

export function App() {
    return (  
    <div className="w-screen h-screen flex justify-center items-center">   
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        
       <Header/>      

       <ScrollArea.Root>
          <ScrollArea.Viewport>
            <SummaryTable />
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="horizontal">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      </div>
    </div>
  )
}