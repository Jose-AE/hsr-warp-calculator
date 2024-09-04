"use client";
import { hsrSettings } from "@/util/simulation-settings/hsr";

import Calculator from "@/components/Calculator";

export default function HSR() {
  return (
    <main className="flex flex-col justify-center items-center m-2">
      <Calculator
        customization={{
          logo: "/hsr/logo.webp",
          settingsIcon: "/hsr/warp.png",
          characterIcon: "/hsr/char.png",
          weaponIcon: "/hsr/lc.png",
          limitedCategory: "5★",
          characterName: "Character",
          pullName: "Warp",
          pullConjugation: "s",
          weaponName: "Ligth Cone",
        }}
        simulationSettings={hsrSettings}
      />
    </main>
  );
}
