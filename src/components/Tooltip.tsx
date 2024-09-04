import { ReactNode } from "react";

export default function Tooltip({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) {
  return (
    <div className="group relative flex max-w-max flex-col items-center justify-center">
      {children}
      <div
        className={`
          z-10
          absolute left-1/2 top-2  
          ml-auto mr-auto min-w-max -translate-x-1/2
          scale-0 transform rounded-lg px-3 py-2 text-xs
          font-medium transition-all duration-300 group-hover:scale-100`}
      >
        <div className="flex max-w-xs flex-col items-center shadow-lg">
          <div
            className="
            z-50
          [clip-path:polygon(50%_0%,100%_100%,0%_100%)]
          h-2 w-4 bg-gray-400"
          ></div>
          <div className="rounded bg-gray-400 p-2 text-center text-xs text-gray-800">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
