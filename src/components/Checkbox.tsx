import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

function Checkbox(
  { text }: ICheckboxProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const id = text + Math.random();

  return (
    <label
      htmlFor={id}
      className=" 
      select-none
      cursor-pointer
      h-[42px] border  w-full px-3 py-2  
        rounded-md border-gray-600 transition-colors
         bg-gray-700"
    >
      <div className="flex flex-row">
        <input ref={ref} id={id} type="checkbox" />
        <p className="ml-2">{text}</p>
      </div>
    </label>
  );
}

export default forwardRef(Checkbox);
