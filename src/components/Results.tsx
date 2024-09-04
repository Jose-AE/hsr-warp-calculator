import { ReactNode } from "react";

export default function Results({
  probability,
  body,
}: {
  probability: number;
  body: ReactNode;
}) {
  return (
    <div className="p-5 border border-gray-600 rounded-md w-full flex-col flex items-center justify-center">
      <span className=" mb-3 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-lg text-xl font-medium bg-green-600/30 text-green-500">
        {Math.round(probability * 100 * 1000) / 1000}%
      </span>

      <div className="mr-2 ">{body}</div>
    </div>
  );
}
