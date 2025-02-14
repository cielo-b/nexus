

import React from 'react'
import { TestimonyProps } from '@/types'
import RichContent from './RichContent';

const Testimony = ({ name, title, ratings, description, profilePic }: TestimonyProps) => {
  return (
    <div className="shadow-shadow-400 hover:shadow-shadow-500 hover:shadow-3xl flex w-full h-fit flex-col items-start justify-center gap-6 rounded-lg p-4 max-sm:p-3 px-8 shadow-xl ring-1 ring-[#f0efef] transition-shadow 3xl-max:px-3 md-min3:items-center xsm-min:gap-3 max-sm:w-full">
      <div className="grid h-20 w-20 max-sm:h-14 max-sm:w-14 place-items-center overflow-hidden rounded-full border-[3px] border-blue-500">
        <img src={profilePic} alt="" className="h-full w-full rounded-full" />
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-2 md-min3:items-center">
        <span className="text-lg font-black text-black xsm-min:text-base">{name}</span>
        <span className="text-sm font-black text-black/60 "><RichContent content={title}/></span>
        <div className="flex items-center justify-center gap-2">
          {new Array(Math.floor(ratings)).fill(null).map((_, idx) => {
            return (
              <img src="/images/star.svg" alt="" className="h-5 w-5 xsm-min:h-3 xsm-min:w-3 max-sm:w-3 max-sm:h-3" key={idx} />
              
            );
          })}
          
      
        </div>
        <p className="text-base font-medium text-gray-600 md-min3:text-center xsm-min:text-sm max-sm:text-sm">
           {description}
      </p>
      </div>
     
    </div>
  )
}

export default Testimony
