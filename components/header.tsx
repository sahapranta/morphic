import React from 'react'
import { ModeToggle } from './mode-toggle'
import { cn } from '@/lib/utils'
import HistoryContainer from './history-container'

export const Header: React.FC = async () => {
  return (
    <header className="sticky py-1 md:py-2 px-4 flex justify-between items-center z-10 backdrop-filter backdrop-blur-lg shadow-md bg-gray-100/80 dark:bg-gray-400/60 border-b border-gray-200 dark:border-gray-400 md:mx-12 mx-4 mt-2 rounded-3xl">
      <div>
        <a href="/" className='flex items-center gap-1'>
          <img src="http://localhost:3000/images/logo.png" alt="AIAPP Logo" className={cn('h-7')} />
          <span className="text-black dark:text-gray-300 font-extrabold text-lg">AIAPP. <span className='text-orange-800/70 dark:text-orange-400'>GG</span></span>
        </a>
      </div>
      <div className="flex gap-0.5">
        <ModeToggle />
        <HistoryContainer location="header" />
      </div>
    </header>
  )
}

export default Header
