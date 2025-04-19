import React from 'react'
import AnalyticItem from "./AnalyticItem"
import { Analytic } from "@/constants"

const Analytics = () => {
  return (
    <div className='flex items-center justify-center w-full h-full bg-[#f2f4fa]'>



<div className="border-[#2563eb] flex border h-fit p-10 gap-10 max-sm:p-5 inset-0 bg-opacity-20 rounded-full backdrop-blur-lg justify-between w-2/3 z-40 max-lg:w-11/12 max-md:flex-col max-md:rounded-3xl max-md:flex-wrap max-md:gap-5">
        {Analytic.map((item, index) => (
          <AnalyticItem title={item.title} key={index} description={item.description} />
        ))}
      </div>
    </div>
  )
}

export default Analytics