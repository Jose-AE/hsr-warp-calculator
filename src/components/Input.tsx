"use client";

import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from "react";
import Tooltip from "./Tooltip";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  tooltip?: string;
}

function Input(
  { className, label, type, ...props }: IInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
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

      <div className="flex items-center">
        <div
          className={` flex  gap-1 mt-1 text-sm text-gray-500  ${
            !label && "hidden"
          }`}
        >
          {label}
          <Tooltip text="hola" />
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Input);
