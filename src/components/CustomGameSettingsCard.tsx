"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ISimulatorGameSettings } from "@/lib/simulator";
import { useForm } from "@/hooks/useForm";
import { useEffect } from "react";
import { Settings2 } from "lucide-react";
import NumberInputField from "./NumberInputField";

interface Props {
  setSimulationSettings: (value: ISimulatorGameSettings) => void;
  simulationSettings: ISimulatorGameSettings;
}

export default function CustomGameSettingsCard({
  setSimulationSettings,
  simulationSettings,
}: Props) {
  const [formData, updateFormData] =
    useForm<ISimulatorGameSettings>(simulationSettings);

  useEffect(() => {
    if (setSimulationSettings) {
      setSimulationSettings(formData);
    }
  }, [formData, setSimulationSettings]);

  const inputClassName = "border-teal-500/30  focus:border-teal-400 ";

  return (
    <Card className="shadow-lg bg-teal-500/10 border-teal-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-slate-100">
          <div className="p-2 rounded-lg bg-teal-500/20">
            <Settings2 className="w-5 h-5 text-teal-400" />
          </div>
          Custom Simulation Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Character Banner */}
        <h3 className="text-teal-300 font-semibold">Character Banner</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NumberInputField
            label="Base Rate (%)"
            tooltip="Base percentage chance to get a 5★ from a single pull"
            value={formData.characterRate.baseRate * 100}
            onChange={(value) =>
              updateFormData("characterRate", {
                ...formData.characterRate,
                baseRate: value / 100,
              })
            }
            className={inputClassName}
            allowDecimals
          />
          <NumberInputField
            label="Limited Rate (%)"
            tooltip="Percentage chance for 5★ to be the limited 5★ eg: 50(50/50), 75(75/25)"
            value={formData.characterRate.limitedRate * 100}
            onChange={(value) =>
              updateFormData("characterRate", {
                ...formData.characterRate,
                limitedRate: value / 100,
              })
            }
            className={inputClassName}
            allowDecimals
          />
          <NumberInputField
            label="Limited Options"
            tooltip="Number of 5★ limited options available. eg: genshin wepon banner has 2 limited weapons on a single banner"
            value={formData.characterRate.limitedOptions}
            onChange={(value) =>
              updateFormData("characterRate", {
                ...formData.characterRate,
                limitedOptions: value,
              })
            }
            className={inputClassName}
          />
          <NumberInputField
            label="Guaranteed After"
            tooltip="The number of consecutive times you must receive a 5★ thats not the desired limited 5★ before you're guaranteed to get the desired limited 5★."
            value={formData.characterRate.guaranteedAfter}
            onChange={(value) =>
              updateFormData("characterRate", {
                ...formData.characterRate,
                guaranteedAfter: value,
              })
            }
            className={inputClassName}
          />
          <NumberInputField
            label="Hard Pity"
            tooltip="Number of pulls to guaranteed a 5★"
            value={formData.characterPity.hardPity}
            onChange={(value) =>
              updateFormData("characterPity", {
                ...formData.characterPity,
                hardPity: value,
              })
            }
            className={inputClassName}
          />
          <NumberInputField
            label="Soft Pity"
            tooltip="Number of pulls after which 5★ base rate starts increasing"
            value={formData.characterPity.softPity}
            onChange={(value) =>
              updateFormData("characterPity", {
                ...formData.characterPity,
                softPity: value,
              })
            }
            className={inputClassName}
            allowDecimals
          />
          <NumberInputField
            label="Soft Pity Increment (%)"
            tooltip="Percentage increase per pull to get 5★ after entering soft pity"
            value={formData.characterPity.softPityIncrement * 100}
            onChange={(value) =>
              updateFormData("characterPity", {
                ...formData.characterPity,
                softPityIncrement: value / 100,
              })
            }
            className={inputClassName}
          />
        </div>

        {/* Weapon Banner */}
        <h3 className="text-teal-300 font-semibold">Weapon Banner</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NumberInputField
            label="Base Rate (%)"
            tooltip="Base percentage chance to get a 5★ from a single pull"
            value={formData.weaponRate.baseRate * 100}
            onChange={(value) =>
              updateFormData("weaponRate", {
                ...formData.weaponRate,
                baseRate: value / 100,
              })
            }
            className={inputClassName}
            allowDecimals
          />
          <NumberInputField
            label="Limited Rate (%)"
            tooltip="Percentage chance for 5★ to be the limited 5★ eg: 50(50/50), 75(75/25)"
            value={formData.weaponRate.limitedRate * 100}
            onChange={(value) =>
              updateFormData("weaponRate", {
                ...formData.weaponRate,
                limitedRate: value / 100,
              })
            }
            className={inputClassName}
            allowDecimals
          />
          <NumberInputField
            label="Limited Options"
            tooltip="Number of 5★ limited options available. eg: genshin wepon banner has 2 limited weapons on a single banner"
            value={formData.weaponRate.limitedOptions}
            onChange={(value) =>
              updateFormData("weaponRate", {
                ...formData.weaponRate,
                limitedOptions: value,
              })
            }
            className={inputClassName}
          />
          <NumberInputField
            label="Guaranteed After"
            tooltip="The number of consecutive times you must receive a 5★ thats not the desired limited 5★ before you're guaranteed to get the desired limited 5★."
            value={formData.weaponRate.guaranteedAfter}
            onChange={(value) =>
              updateFormData("weaponRate", {
                ...formData.weaponRate,
                guaranteedAfter: value,
              })
            }
            className={inputClassName}
          />
          <NumberInputField
            label="Hard Pity"
            tooltip="Number of pulls to guaranteed a 5★"
            value={formData.weaponPity.hardPity}
            onChange={(value) =>
              updateFormData("weaponPity", {
                ...formData.weaponPity,
                hardPity: value,
              })
            }
            className={inputClassName}
          />
          <NumberInputField
            label="Soft Pity"
            tooltip="Number of pulls after which 5★ base rate starts increasing"
            value={formData.weaponPity.softPity}
            onChange={(value) =>
              updateFormData("weaponPity", {
                ...formData.weaponPity,
                softPity: value,
              })
            }
            className={inputClassName}
          />
          <NumberInputField
            label="Soft Pity Increment (%)"
            tooltip="Percentage increase per pull to get 5★ after enetring soft pity"
            value={formData.weaponPity.softPityIncrement * 100}
            onChange={(value) =>
              updateFormData("weaponPity", {
                ...formData.weaponPity,
                softPityIncrement: value / 100,
              })
            }
            className={inputClassName}
            allowDecimals
          />
        </div>
      </CardContent>
    </Card>
  );
}
