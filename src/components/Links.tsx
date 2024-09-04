import Link from "next/link";
import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaGithub, FaGratipay, FaInfo } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";

export default function Links() {
  return (
    <div className="fixed bottom-0 right-0 p-2 m-1 z-30  bg-[#0000007f] rounded-full">
      <span className="flex gap-3">
        <Link
          href="https://github.com/Jose-AE/hsr-warp-calculator"
          target="_blank"
        >
          <FaGithub />
        </Link>

        <Link href="https://buymeacoffee.com/joseae" target="_blank">
          <SiBuymeacoffee />
        </Link>

        <Link href="/info">
          <BsInfoCircleFill />
        </Link>
      </span>
    </div>
  );
}
