import Calculator from "@/components/Calculator";
import { zzzSettings } from "@/util/simulation-settings/zzz";
import React from "react";

export default function page() {
  return (
    <main className="flex flex-col justify-center items-center m-2">
      <Calculator
        customization={{
          logo: "/zzz/logo.png",
          settingsIcon: "/zzz/search.webp",
          characterIcon: "/zzz/agent.webp",
          weaponIcon: "/zzz/engine.webp",
          limitedCategory: "S-Rank",
          characterName: "Agent",
          pullName: "Signal Search",
          pullConjugation: "es",

          weaponName: "W-Engine",
        }}
        simulationSettings={zzzSettings}
      />
    </main>
  );
}
