"use client";
// Tooltip.tsx
import React, { useState } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

function Tooltip({ text, children }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Target Element */}
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="cursor-pointer"
      >
        {children}
      </div>

      {/* Tooltip */}
      {
        <div
          className={`${
            show ? "opacity-100" : "opacity-0"
          }   absolute left-1/2 transform  -translate-x-1/2 bottom-full mb-2 px-3 py-2 rounded-md text-gray-800 bg-gray-200 text-sm shadow-lg transition-opacity duration-2000 ease-in-out  `}
        >
          {text}
        </div>
      }
    </div>
  );
}

export default Tooltip;
