"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const Links: { name: string; href: string; icon: string }[] = [
  { name: "Honkai", href: "/", icon: "/Item_Star_Rail_Special_Pass.webp" },
  { name: "Zenless", href: "/zzz", icon: "/Item_Encrypted_Master_Tape.webp" },
  { name: "Genshin", href: "/genshin", icon: "/Item_Intertwined_Fate.webp" },
];

export default function Navbar({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setSelected(window.location.pathname);
  }, [pathname]);

  return (
    <div className="h-screen flex flex-col">
      <nav className="justify-center pt-4 pl-1 flex gap-6  bg-slate-800 shadow-md">
        {Links.map((link, i) => (
          <Link
            className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium ${
              link.href === selected
                ? "text-sky-600 border-sky-500"
                : "text-gray-500 border-transparent hover:border-gray-300 hover:text-gray-400"
            }`}
            key={i}
            href={link.href}
          >
            <Image
              src={link.icon}
              alt="icon"
              width={10000}
              height={1000}
              className="size-7"
            />

            {link.name}
          </Link>
        ))}
      </nav>
      <main className="h-full overflow-auto ">{children}</main>
    </div>
  );
}
