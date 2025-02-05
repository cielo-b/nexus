import React from 'react';
import { AnalyticsProps } from '@/types';
import CountUp from 'react-countup';

const AnalyticItem = ({ title, description }: AnalyticsProps) => {

  const endValue = typeof title === 'number' ? title : 0;
  
  return (
    <div className='flex flex-col text-black text-center items-center justify-center gap-3 max-md:w-1/3 md:w-1/3 max-sm:w-full sm:w-full max-md:bg-white/5 max-md:gap-2 max-md:py-2 rounded-2xl'>
      <CountUp end={endValue} duration={5} className='font-medium text-3xl max-sm:text-2xl'/>
      <p className='font-light text-center text-md max-sm:text-sm'>{description}</p>
    </div>
  );
}

export default AnalyticItem;
