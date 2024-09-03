"use client";

import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

function Input(
  { className, label, type, ...props }: IInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${className} w-full `}>
      <input
        ref={ref}
        type={type}
        {...props}
        className={`${className} 
        w-full px-3 py-2 border 
        rounded-md border-gray-600 transition-colors
         bg-gray-700 focus:outline-none
          focus:border-blue-300   `}
      />

      <p className={`mt-1 text-sm text-gray-500  ${!label && "hidden"}`}>
        {label}
      </p>
    </div>
  );
}

export default forwardRef(Input);
