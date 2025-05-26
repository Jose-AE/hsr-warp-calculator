"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NumberInputField from "./NumberInputField";
import { Settings } from "lucide-react";

interface Props {
  pullName: string;
  setPulls: (value: number) => void;
  pulls: number;
  setNumSimulations: (value: number) => void;
  numSimulations: number;
}

export default function SimulationSettingsCard({
  numSimulations,
  setNumSimulations,
  pullName,
  pulls,
  setPulls,
}: Props) {
  return (
    <Card className="shadow-lg bg-gradient-to-br from-indigo-500/10 to-indigo-500/10 border-indigo-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-slate-100">
          <div className="p-2 rounded-lg bg-indigo-500/20">
            <Settings className="w-5 h-5 text-indigo-400" />
          </div>
          Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInputField
            label={pullName}
            tooltip={`Number of ${pullName} to spend`}
            value={pulls}
            onChange={setPulls}
            className=" border-indigo-500/30 focus:border-indigo-400"
          />

          <NumberInputField
            label="Simulations"
            tooltip="Increasing the number of simulations will yield more accurate results but will extend the time required for calculations. The more warps you make the longer each simulation takes. Leave default value for best results"
            value={numSimulations}
            onChange={setNumSimulations}
            className=" border-indigo-500/30 focus:border-indigo-400"
          />
        </div>
      </CardContent>
    </Card>
  );
}
