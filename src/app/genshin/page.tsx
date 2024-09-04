import Calculator from "@/components/Calculator";
import Tooltip from "@/components/Tooltip";
import { genshinSettings } from "@/util/simulation-settings/genshin";
import React from "react";

export default function page() {
  return (
    <main className="flex flex-col justify-center items-center m-2">
      <Calculator
        customization={{
          logo: "/genshin/logo.png",
          settingsIcon: "/genshin/wish.webp",
          characterIcon: "/genshin/char.png",
          weaponIcon: "/genshin/weapon.webp",
          limitedCategory: "5★",
          characterName: "Character",
          pullName: "Wish",
          pullConjugation: "es",

          weaponName: "Weapon",
        }}
        simulationSettings={genshinSettings}
      />
    </main>
  );
}
