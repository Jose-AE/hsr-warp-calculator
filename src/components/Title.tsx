import React from "react";
import Image from "next/image";

export default function Title({ text, icon }: { text: string; icon?: string }) {
  return (
    <div className="py-1 border  border-gray-600 rounded-md w-full flex items-center justify-center">
      <p className="mr-2 select-none">{text}</p>

      {icon && (
        <Image
          width={1000}
          height={1000}
          className={`h-5 w-5   `}
          src={icon}
          alt="Cone"
        />
      )}
    </div>
  );
}
