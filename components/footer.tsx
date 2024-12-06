import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="w-fit p-1 md:p-2 fixed bottom-0 right-0">
      <div className="flex text-center text-sm text-gray-500">
        All Rights Reserved &copy;2024
        <Link href="https://aiapp.gg" target="_blank">
          <span className="text-black font-medium ml-1">AIAPP. <span className='text-orange-800/70'>GG</span></span>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
