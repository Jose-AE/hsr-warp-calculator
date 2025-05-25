"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, Settings } from "lucide-react";
import Tooltip from "./ui/tooltip";

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
          <div className="space-y-3">
            <Label className="text-sm md:text-sm  font-medium text-slate-200">
              {pullName}
              <Tooltip message={`Number of ${pullName} to spend`}>
                <Info className="w-3 h-3" />
              </Tooltip>
            </Label>
            <Input
              type="number"
              autoComplete="off"
              placeholder="0"
              value={pulls === 0 ? "" : pulls}
              onChange={(e) =>
                e.target.value === ""
                  ? setPulls(0) // Or handle this as special case
                  : setPulls(Number(e.target.value))
              }
              className="h-11 text-slate-100 bg-slate-800/50 border-indigo-500/30 focus:border-indigo-400"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-200">
              Simulations
              <Tooltip message="Increasing the number of simulations will yield more accurate results but will extend the time required for calculations. The more warps you make the longer each simulation takes. Leave default value for best results">
                <Info className="w-3 h-3" />
              </Tooltip>
            </Label>
            <Input
              type="number"
              autoComplete="off"
              placeholder="0"
              value={numSimulations === 0 ? "" : numSimulations}
              onChange={(e) =>
                e.target.value === ""
                  ? setNumSimulations(0) // Or handle this as special case
                  : setNumSimulations(Number(e.target.value))
              }
              className="h-11 text-slate-100 bg-slate-800/50 border-indigo-500/30 focus:border-indigo-400"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
