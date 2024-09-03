import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

export default function GithubLink() {
  return (
    <div className="fixed bottom-0 right-0 p-2 m-1 z-30  bg-[#0000007f] rounded-full">
      <Link
        href="https://github.com/Jose-AE/hsr-warp-calculator"
        target="_blank"
      >
        <FaGithub />
      </Link>
    </div>
  );
}
