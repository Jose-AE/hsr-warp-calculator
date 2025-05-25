import { ReactNode, useState, useRef, useEffect } from "react";

export default function Tooltip({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Close on outside tap
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-flex items-center group"
      onClick={() => setVisible((prev) => !prev)}
    >
      {children}

      <div
        ref={tooltipRef}
        role="tooltip"
        className={`
          absolute left-1/2 top-full mt-2 w-max max-w-[10rem] md:max-w-lg  lg:max-w-xl -translate-x-1/2
          ${visible ? "scale-100" : "scale-0"}
          group-hover:scale-100
          transform transition-transform duration-200 ease-out
          rounded-lg bg-slate-900/80 px-3 py-2 text-xs text-white shadow-xl
          backdrop-blur-sm border border-slate-700/50 z-10 pointer-events-none
        `}
      >
        {message}
      </div>
    </div>
  );
}
