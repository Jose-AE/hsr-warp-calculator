"use client";
// Tooltip.tsx
import React, { useState } from "react";
import { MdInfoOutline } from "react-icons/md";

interface TooltipProps {
  text: string;
  iconSize?: number;
}

function Tooltip({ text, iconSize = 5 }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Target Element */}
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="cursor-pointer"
      >
        <MdInfoOutline className={`fill-gray-500 size-${iconSize}`} />
      </div>

      <p
        className={`
          ${show ? "opacity-100" : "opacity-0"}
          transition-opacity absolute
          duration-300
           flex items-center justify-center w-48 
           p-3 text-gray-600 -translate-x-1/2 bg-white 
           rounded-lg shadow-lg -top-16 left-1/2  `}
      >
        <span className="truncate ">{text}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 absolute rotate-45 -translate-x-1/2 left-1/2 bottom-0.5 -mb-3 transform text-white fill-current"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"></path>
        </svg>
      </p>
    </div>
  );
}

export default Tooltip;
