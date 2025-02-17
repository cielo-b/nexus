import Link from "next/link";
import React from "react";


const page = () => {
  return (
    <div className='bg-white flex flex-col w-full items-center justify-center gap-10 h-[100vh]'>
      <img src='/images/logo-dark.svg' alt='logo' className='w-32' />
      <img src='/images/404.svg' alt='404' className='w-11/12 lg:w-8/12 ' />
      <div className='flex flex-col items-center justify-center gap-6'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <h1 className='font-bold text-2xl text-[#000912]'>
            Something went wrong
          </h1>
          <p className='font-normal text-md text-[#000912]'>
            Sorry , We can’t find this page you’re looking for.
          </p>
        </div>

        <Link className='py-3 w-1/2 bg-[#2563eb] text-white rounded-full font-semibold flex items-center justify-center hover:scale-95 transition-all duration-300' href={"/"}>
          Go to back
        </Link>
      </div>
    </div>
  );
};

export default page;
