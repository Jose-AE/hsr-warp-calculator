import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TrendingUp } from "lucide-react";
import { IGameTerms } from "@/lib/games";

interface Props {
  numSimulations: number;
  successRate: number;
  pulls: number;
  characterCopies: number;
  weaponCopies: number;
  gameTerms: IGameTerms;
}

export default function SimulationResultsCard({
  characterCopies,
  numSimulations,
  pulls,
  successRate,
  weaponCopies,
  gameTerms,
}: Props) {
  return (
    <Card className="shadow-xl bg-slate-900/60 border border-slate-700/40 backdrop-blur-lg rounded-2xl">
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center gap-3 text-white text-xl font-semibold">
          <TrendingUp className="w-6 h-6 text-green-400" />
          Simulation Results
        </CardTitle>
        <CardDescription className="text-slate-300 leading-relaxed">
          Ran <strong>{numSimulations.toLocaleString()}</strong> simulations,
          each consisting of <strong>{pulls.toLocaleString()}</strong>{" "}
          {gameTerms.pullName + gameTerms.pullConjugation}. Simulations began on
          the {gameTerms.characterName} banner and switched to the{" "}
          {gameTerms.weaponName} banner after obtaining the desired number of
          limited {gameTerms.characterName}. The result percentage represents
          the chance you have of getting <strong>{characterCopies}</strong>{" "}
          Limited {gameTerms.characterName} and <strong>{weaponCopies}</strong>{" "}
          Limited {gameTerms.weaponName} copies with{" "}
          <strong>{pulls.toLocaleString()}</strong> warps
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Card className="bg-gradient-to-br from-green-400/20 to-emerald-500/20 border border-green-400/30 rounded-xl">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-extrabold text-white drop-shadow-sm">
              {Math.round(successRate * 100 * 1000) / 1000}%
            </div>
            <p className="mt-2 text-sm text-slate-300">Average Success Rate</p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
