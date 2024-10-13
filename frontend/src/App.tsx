import './App.css'
import { TabMenu } from './components/TabMenu'
import { Button } from "@/components/ui/button"
import tokenImage from '@/assets/file.png'
import stellarImage from '@/assets/stellar.png'


function App() {
  return (
    <div className='flex flex-col h-full w-full'>
      <h1 className='text-green-600 text-9xl font-semibold font-shadows'>KALE</h1>
      <div className='flex flex-col absolute top-8 right-8 space-y-3'>
        <Button variant="outline" className=' font-semibold'> arthur.wronski@gmail.com </Button>
        <div className='flex flex-row'>
          <img src={tokenImage} className='h-16 w-12'/>
          <p className='font-semibold mt-5 mr-10'>50,000 XLM </p>
        </div>
      </div>
      <p className='text-center text-[#888888] font-semibold mb-4 font-shadows text-xl'>
        The World's on us
      </p>
     
      <div className='flex flex-row justify-center'> <TabMenu/></div>
      <div className='absolute bottom-3 right-3 text-center text-[#888888] font-semibold mb-4'>
        Powered by
        <img src={stellarImage} className='w-20 h-6'/>
      </div>

    </div>
  )
}

export default App
