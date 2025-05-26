"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BannerSettingsCard from "@/components/BannerSettingsCard";
import SimulationSettingsCard from "@/components/SimulationSettingsCard";
import SimulationResultsCard from "@/components/SimulationResultsCard";
import { CUSTOM_GAME, GAMES, IGame } from "@/lib/games";
import { useForm } from "@/hooks/useForm";
import { Settings2, Sword, User } from "lucide-react";
import { ISimulationSettings, simulate } from "@/lib/simulator";
import { useSearchParams } from "next/navigation";
import CustomGameSettingsCard from "@/components/CustomGameSettingsCard";

interface IFormData {
  numSimulations: number;
  pulls: number;
  characterPity: number;
  weaponPity: number;
  characterCopies: number;
  weaponCopies: number;
  isCharacterGuaranteed: boolean;
  isWeaponGuaranteed: boolean;
}

function Page() {
  const searchParams = useSearchParams();
  const gameId = searchParams.get("game");

  const [selectedGame, setSelectedGame] = useState<IGame>(
    GAMES.find((g) => g.id === gameId) ||
      (gameId === "custom" ? CUSTOM_GAME : GAMES[0])
  );

  const [customSimulationSettings, setCustomSimulationSettings] =
    useState<ISimulationSettings>(CUSTOM_GAME.simulationSettings);

  const [successRate, setSuccessRate] = useState(-1);

  const [formData, updateForm] = useForm<IFormData>({
    characterCopies: 0,
    characterPity: 0,
    isCharacterGuaranteed: false,
    isWeaponGuaranteed: false,
    numSimulations: 10000,
    pulls: 0,
    weaponCopies: 0,
    weaponPity: 0,
  });

  function updateFormData(key: keyof IFormData, value: number | boolean) {
    setSuccessRate(-1);
    updateForm(key, value);
  }

  function handleGameChange(gameId: string) {
    const url = new URL(window.location.href);
    url.searchParams.set("game", gameId); // Change or add the 'page' param
    window.history.pushState({}, "", url); // Update the URL without reloading

    setSuccessRate(-1);

    if (gameId === "custom") setSelectedGame(CUSTOM_GAME);
    else setSelectedGame(GAMES.find((game) => game.id === gameId)!);
  }

  function handleCalculate() {
    const res = simulate(
      {
        characterCopies: formData.characterCopies,
        characterPity: formData.characterPity,
        isCharacterGuaranteed: formData.isCharacterGuaranteed,
        isWeaponGuaranteed: formData.isWeaponGuaranteed,
        numSimulations: formData.numSimulations,
        pulls: formData.pulls,
        weaponCopies: formData.weaponCopies,
        weaponPity: formData.weaponPity,
      },
      selectedGame.id === "custom"
        ? customSimulationSettings
        : selectedGame.simulationSettings
    );
    setSuccessRate(res);

    // Scroll to the bottom of the page after calculation
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }

  function validateForm() {
    return (
      formData.pulls > 0 &&
      formData.characterPity >= 0 &&
      formData.weaponPity >= 0 &&
      formData.numSimulations > 0 &&
      (formData.characterCopies > 0 || formData.weaponCopies > 0)
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="container max-w-3xl p-6 mx-auto space-y-8">
        {/* Header */}
        {/* <div className="py-8 space-y-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-white to-slate-300 bg-clip-text">
              Gacha Pull Calculator
            </h1>
          </div>
          <p className="max-w-2xl mx-auto text-xl text-slate-400">
            Calculate your pull requirements and optimize your resource planning
            across multiple gacha games
          </p>
        </div> */}

        {/* Main Card */}
        <Card className="shadow-2xl bg-slate-900/50 border-slate-700/50 backdrop-blur-xl mt-20">
          <CardContent className="space-y-8">
            {/* Game Selection */}
            <div className="space-y-3 ">
              <Label className="flex items-center gap-2 font-medium text-slate-200">
                Select Game
              </Label>
              <Select
                value={selectedGame.id}
                onValueChange={(v) => {
                  handleGameChange(v);
                }}
              >
                <SelectTrigger className="cursor-pointer w-full !h-12 transition-colors text-slate-100 bg-slate-800/50 border-slate-600 hover:border-slate-500">
                  <SelectValue placeholder="Choose your game" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 cursor-pointer">
                  {GAMES.map((game, i) => (
                    <SelectItem
                      key={i}
                      value={game.id}
                      className="text-slate-100 focus:bg-slate-700 focus:text-slate-300 cursor-pointer "
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={game.icon}
                          alt="Icon"
                          width={160}
                          height={160}
                          className={`w-6 h-6 rounded-full `}
                        ></Image>
                        {game.name}
                      </div>
                    </SelectItem>
                  ))}
                  <SelectItem
                    value={"custom"}
                    className="text-slate-100 focus:bg-slate-700 focus:text-slate-300 cursor-pointer "
                  >
                    <div className="flex items-center gap-3">
                      <Settings2
                        className={`w-6 h-6 rounded-full ml-1 text-white `}
                      />
                      Custom
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom Game Settings */}
            {selectedGame.id === "custom" && (
              <CustomGameSettingsCard
                simulationSettings={customSimulationSettings}
                setSimulationSettings={setCustomSimulationSettings}
              />
            )}

            {/* Settings*/}
            <SimulationSettingsCard
              numSimulations={formData.numSimulations}
              setNumSimulations={(value) =>
                updateFormData("numSimulations", value)
              }
              pullName={
                selectedGame.gameTerms.pullName +
                selectedGame.gameTerms.pullConjugation
              }
              pulls={formData.pulls}
              setPulls={(value) => updateFormData("pulls", value)}
            />

            {/* Banner Configuration */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {/* Character Banner */}
              <BannerSettingsCard
                icon={User}
                currentPity={formData.characterPity}
                setCurrentPity={(value) =>
                  updateFormData("characterPity", value)
                }
                desiredCopies={formData.characterCopies}
                setDesiredCopies={(value) =>
                  updateFormData("characterCopies", value)
                }
                guaranteed={formData.isCharacterGuaranteed}
                setGuaranteed={(value) =>
                  updateFormData("isCharacterGuaranteed", value)
                }
                gameTerms={selectedGame.gameTerms}
                type="character"
              />

              {/* Weapon Banner */}
              <BannerSettingsCard
                icon={Sword}
                currentPity={formData.weaponPity}
                setCurrentPity={(value) => updateFormData("weaponPity", value)}
                desiredCopies={formData.weaponCopies}
                setDesiredCopies={(value) =>
                  updateFormData("weaponCopies", value)
                }
                guaranteed={formData.isWeaponGuaranteed}
                setGuaranteed={(value) =>
                  updateFormData("isWeaponGuaranteed", value)
                }
                gameTerms={selectedGame.gameTerms}
                type="weapon"
              />
            </div>

            {/* Calculate Button */}
            <div className="flex justify-center">
              <Button
                disabled={!validateForm()}
                onClick={handleCalculate}
                className="w-full py-6 text-lg text-white border cursor-pointer bg-sky-600 border-sky-500/50 hover:bg-sky-700"
              >
                Calculate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {successRate >= 0 && (
          <SimulationResultsCard
            characterCopies={formData.characterCopies}
            gameTerms={selectedGame.gameTerms}
            numSimulations={formData.numSimulations}
            pulls={formData.pulls}
            successRate={successRate}
            weaponCopies={formData.weaponCopies}
          />
        )}
      </div>
    </div>
  );
}

export default function page() {
  return (
    //Suspense to fix this error: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
    <Suspense>
      <Page />
    </Suspense>
  );
}
