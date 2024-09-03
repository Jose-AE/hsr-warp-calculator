import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  className,
  disabled = false,
  loading = false,
  ...props
}: IButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`${className} 
        transition-colors w-full py-2 px-4 bg-blue-400 text-white rounded-lg 
        flex items-center justify-center
        ${
          disabled || loading
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-blue-500"
        }

        `}
    >
      {loading ? (
        <div
          className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent  rounded-full dark:text-white"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
