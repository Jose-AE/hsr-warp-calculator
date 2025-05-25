"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, Info } from "lucide-react";
import { useId } from "react";
import Tooltip from "./ui/tooltip";

interface Props {
  icon: React.ElementType;
  title: string;
  setDesiredCopies: (value: number) => void;
  desiredCopies: number;
  setCurrentPity: (value: number) => void;
  currentPity: number;
  guaranteed: boolean;
  setGuaranteed: (value: boolean) => void;
  hardPity: number;
  softPity: number;
  softPityIncrement: number;

  currentPityTooltip: string;
  desiredCopiesTooltip: string;
}

export default function BannerSettingsCard({
  icon: Icon,
  title,
  desiredCopies,
  setDesiredCopies,
  guaranteed,
  setGuaranteed,
  currentPity,
  setCurrentPity,
  hardPity,
  softPity,
  softPityIncrement,
  currentPityTooltip,
  desiredCopiesTooltip,
}: Props) {
  const switchId = useId();

  return (
    <Card className="shadow-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-slate-100">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <Icon className="w-5 h-5 text-cyan-400" />
          </div>
          {title} Banner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-200">
              Current Pity
              <Tooltip message={currentPityTooltip}>
                <Info className="w-3 h-3" />
              </Tooltip>
            </Label>
            <Input
              type="number"
              autoComplete="off"
              placeholder="0"
              value={currentPity === 0 ? "" : currentPity}
              onChange={(e) =>
                e.target.value === ""
                  ? setCurrentPity(0) // Or handle this as special case
                  : setCurrentPity(Number(e.target.value))
              }
              className="h-11 text-slate-100 bg-slate-800/50 border-cyan-500/30 focus:border-cyan-400"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-200">
              Desired Copies
              <Tooltip message={desiredCopiesTooltip}>
                <Info className="w-3 h-3" />
              </Tooltip>
            </Label>
            <Input
              type="number"
              autoComplete="off"
              placeholder="0"
              value={desiredCopies === 0 ? "" : desiredCopies}
              onChange={(e) =>
                e.target.value === ""
                  ? setDesiredCopies(0) // Or handle this as special case
                  : setDesiredCopies(Number(e.target.value))
              }
              className="h-11 text-slate-100 bg-slate-800/50 border-cyan-500/30 focus:border-cyan-400"
            />
          </div>
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
              Guaranteed Limited {title}
            </Label>
          </div>
          <Switch
            id={switchId}
            checked={guaranteed}
            onCheckedChange={setGuaranteed}
            className="data-[state=checked]:bg-cyan-500 data-[state=unchecked]:bg-slate-500 cursor-pointer"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
            Hard Pity: {hardPity}
          </Badge>
          <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
            Soft Pity: {softPity}
          </Badge>
          <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
            Soft Pity Chance Increment: {softPityIncrement * 100}%
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
