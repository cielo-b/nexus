import React from 'react'
import TagButton from './TagButton'
import { Fade } from 'react-awesome-reveal';

const CallToAction = () => {
  return (
    <div className='flex relative px-[5%] bg-[#2563eb] h-[500px] overflow-hidden pt-20 pb-20 max-md:py-5 w-full max-sm:px-6 justify-between items-center'>
        <img src="/images/lane-big.svg" alt="lane" className='absolute bottom-0 left-0 z-0 '/>
        <img src="/images/lane-small.svg" alt="lane" className='absolute top-0 right-0 z-0 '/>
      <div className='relative z-40 h-full max-h-full min-h-full w-1/2 hidden lg:flex'>
        <img src="/images/Map-screen.svg" alt="home" className='w-[350px] absolute -bottom-72 -left-10 scale-[80%]'/>
        <img src="/images/Home-screen.svg" alt="map" className='w-[350px] absolute -bottom-20 left-[75px]   scale-[80%]'/>
      </div>
      <Fade className='lg:w-2/3 flex flex-col items-start gap-5  justify-start w-full z-10'>
        <div className='w-full flex flex-col items-start gap-5  justify-start z-10'>
        <h1 className='text-[#000912] font-bold text-4xl max-md:text-3xl max-sm:text-2xl '>Download Now and begin your journey to better navigation </h1>
        <p className='text-md text-[#000912]/90 max-sm:text-sm'>Enhance your daily commute by utilizing our traffic management app, which aims to alleviate the frustrations often associated with traffic congestion. Bid farewell to the hassles of navigating through traffic jams and embrace a more seamless journey to your destination. 1</p>
        <div className="flex w-fit  gap-5">
          <TagButton tagLogo="/images/GooglePlay.svg" tagText="/images/GoogleText.svg"/>
          <TagButton tagLogo="/images/Apple.svg" tagText="/images/AppleText.svg"/>
        </div>
      </div>
      </Fade>
      

    </div>
  )
}

export default CallToAction
