import React from "react";
import { InputFieldProps } from "@/types";

const MessageInputField = ({ icon, label, placeholder,style }: InputFieldProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-2 flex-start items-start">
      <p className="font-normal text-[#2563eb] text-lg max-md:text-md max-sm:text-sm">{label}</p>
      <div className="flex items-start justify-start gap-3 relative rounded-3xl w-full px-6 py-6 bg-[#2563eb]/5 ">
        <img src={icon} alt="icon" className="w-[28px] max-md:w-[24px] max-sm:w-[20px]" />
        <textarea
          name={label}
          id={label}
          className={"w-full placeholder-white/50 h-[200px] font-normal bg-transparent text-md items-start justify-start flex text-white focus:outline-0 " + style}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default MessageInputField;