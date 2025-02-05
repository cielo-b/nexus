import React from "react";
import { InputFieldProps } from "@/types";

const InputField: React.FC<InputFieldProps & { ref: any; onBlur: () => void; name: string; error: any; }> = ({ 
  icon, 
  label, 
  placeholder, 
  value, 
  onChange, 
  style, 
  ref, 
  onBlur, 
  name, 
  error 
}) => {
  return (
    <div className="w-full h-full flex flex-col gap-2 flex-start items-start">
      {label && (
        <p className="font-normal text-[#2563eb] text-lg max-md:text-md max-sm:text-sm">
          {label}
        </p>
      )}
      <div className={`flex items-center justify-start gap-3 relative rounded-full w-full px-6 bg-[#2563eb]/5`}>
        <img src={icon} alt="icon" className="w-[28px] max-md:w-[24px] max-sm:w-[20px]" />
        <input
          type="text"
          name={name}
          id={name}
          className={`w-full h-14 font-normal bg-transparent text-md items-start justify-start flex focus:outline-0 ${style === "dark" ? "placeholder-[#000912]/50 text-[#000912]" : "placeholder-white/50 text-white"}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        />
      </div>
      {error && (
        <p className="text-red-600 text-sm mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default InputField;
