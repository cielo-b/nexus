import React from 'react'
import { HeaderProps } from '@/types'

const Header = ({title,icon}:HeaderProps) => {
  return (
    <div className='px-6 py-3 flex gap-3 rounded-full bg-[#2563eb18] border border-[#2563eb] backdrop-blur-xl max-sm:py-4 '>
      {icon}
      <p className='text-md text-[#2563eb] font-semibold max-sm:text-xs '>{title}</p>
    </div>
  )
}

export default Header
