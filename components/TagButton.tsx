import React from 'react'
import { TagButtonProps } from '@/types'

const TagButton = ({tagLogo,tagText}:TagButtonProps) => {
  return (
    <div className='flex py-4 px-5  w-fit bg-white gap-3 items-center justify-center  rounded-full '>
      <img src={tagLogo} alt="google image" className='w-[24px] max-sm:w-[16px]'/>
      <img src={tagText} alt="google text" className='h-[24px] max-sm:h-[20px]'/>
    </div>
  )
}

export default TagButton
