"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CircleCheck } from "lucide-react";
import { useId } from "react";
import { IGameTerms } from "@/lib/games";
import NumberInputField from "./NumberInputField";

interface Props {
  icon: React.ElementType;
  gameTerms: IGameTerms;
  type: "character" | "weapon";

  setDesiredCopies: (value: number) => void;
  desiredCopies: number;

  setCurrentPity: (value: number) => void;
  currentPity: number;

  setGuaranteed: (value: boolean) => void;
  guaranteed: boolean;
}

export default function BannerSettingsCard({
  icon: Icon,
  type,
  currentPity,
  desiredCopies,
  gameTerms,
  guaranteed,
  setCurrentPity,
  setDesiredCopies,
  setGuaranteed,
}: Props) {
  const switchId = useId();

  const name =
    type === "character" ? gameTerms.characterName : gameTerms.weaponName;

  return (
    <Card className="shadow-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-slate-100">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <Icon className="w-5 h-5 text-cyan-400" />
          </div>
          {name} Banner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInputField
            label="Desired Copies"
            tooltip={`Desired quantity of ${gameTerms.limitedCategory} Limited ${name}`}
            value={desiredCopies}
            onChange={setDesiredCopies}
            className="border-cyan-500/30 focus:border-cyan-400"
          />

          <NumberInputField
            label="Current Pity"
            tooltip={`Number of ${
              gameTerms.pullName + gameTerms.pullConjugation
            } since your last ${gameTerms.limitedCategory} ${name}`}
            value={currentPity}
            onChange={setCurrentPity}
            className="border-cyan-500/30 focus:border-cyan-400"
          />
        </div>

        <label
          htmlFor={switchId}
          className="cursor-pointer flex items-center justify-between p-4 border rounded-lg bg-slate-800/30 border-cyan-500/20"
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <CircleCheck className="w-4 h-4 text-cyan-400" />
            <Label
              htmlFor={switchId}
              className="font-medium text-slate-200 cursor-pointer"
            >
              Guaranteed Limited {name}
            </Label>
          </div>
          <Switch
            id={switchId}
            checked={guaranteed}
            onCheckedChange={setGuaranteed}
            className="data-[state=checked]:bg-cyan-500 data-[state=unchecked]:bg-slate-500 cursor-pointer"
          />
        </label>

        {/* Game settings badges -unused */}
        {/* <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
            Hard Pity: {hardPity}
          </Badge>
          <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
            Soft Pity: {softPity}
          </Badge>
          <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
            Soft Pity Chance Increment: {softPityIncrement * 100}%
          </Badge>
        </div> */}
      </CardContent>
    </Card>
  );
}
