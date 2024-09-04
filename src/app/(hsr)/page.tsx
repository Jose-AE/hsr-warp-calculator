"use client";

import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Results from "@/components/Results";
import Title from "@/components/Title";
import Tooltip from "@/components/Tooltip";
import { hsrSettings } from "@/util/simulation-settings/hsr";
import {
  DEFAULT_NUM_SIMULATIONS,
  ISimulatorInput,
  simulate,
} from "@/util/simulator";
import { useState } from "react";

export default function HSR() {
  const [pulls, setPulls] = useState(0);
  const [characterPity, setCharacterPity] = useState(0);
  const [weaponPity, setWeaponPity] = useState(0);
  const [isWeaponGuaranteed, setIsWeaponGuaranteed] = useState(false);
  const [isCharacterGuaranteed, setIsCharacterGuaranteed] = useState(false);
  const [characterCopies, setCharacterCopies] = useState(0);
  const [weaponCopies, setWeaponCopies] = useState(0);
  const [numSimulations, setNumSimulations] = useState(DEFAULT_NUM_SIMULATIONS);

  const [chance, setChance] = useState(-1);

  function changeValue(e: any, setter: any) {
    setChance(-1);
    const value = parseInt(e.target.value, 10);
    setter(isNaN(value) ? 0 : value);
  }

  function onCalculate() {
    const res = simulate(
      {
        characterPity,
        weaponPity,
        characterCopies,
        isCharacterGuaranteed,
        isWeaponGuaranteed,
        numSimulations,
        pulls,
        weaponCopies,
      },
      hsrSettings
    );
    setChance(res);
  }

  return (
    <main className="flex flex-col justify-center items-center m-2">
      <div className="w-full max-w-md bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 my-12 space-y-4">
        <Title text="Settings" icon="/hsr/warp.png" />

        <section className="flex gap-5">
          <Input
            onChange={(e) => {
              changeValue(e, setPulls);
            }}
            label="Warps"
            type="number"
            placeholder="0"
            autoComplete="off"
          />

          <Input
            onChange={(e) => {
              changeValue(e, setNumSimulations);
            }}
            value={DEFAULT_NUM_SIMULATIONS}
            label="Simulations"
            type="number"
            placeholder="0"
            autoComplete="off"
          />
        </section>

        <Title text="Character" icon="/hsr/char.png" />

        <section className="flex gap-5">
          <Input
            onChange={(e) => {
              changeValue(e, setCharacterPity);
            }}
            label="Banner Pity"
            type="number"
            placeholder="0"
            autoComplete="off"
          />

          <Input
            onChange={(e) => {
              changeValue(e, setCharacterCopies);
            }}
            label="Copies"
            type="number"
            placeholder="0"
            autoComplete="off"
          />

          <Checkbox
            onChange={() => {
              setIsCharacterGuaranteed(!isCharacterGuaranteed);
            }}
            id="char"
            text="Guaranteed"
          />
        </section>

        <Title text="Light Cone" icon="/hsr/lc.png" />

        <section className="flex gap-5">
          <Input
            onChange={(e) => {
              changeValue(e, setWeaponPity);
            }}
            label="Banner Pity"
            type="number"
            placeholder="0"
            autoComplete="off"
          />

          <Input
            onChange={(e) => {
              changeValue(e, setWeaponCopies);
            }}
            label="Copies"
            type="number"
            placeholder="0"
            autoComplete="off"
          />

          <Checkbox
            onChange={() => {
              setIsWeaponGuaranteed(!isWeaponGuaranteed);
            }}
            id="wep"
            text="Guaranteed"
          />
        </section>

        <div className="space-y-6">
          <Button
            onClick={onCalculate}
            disabled={
              !(
                pulls > 0 &&
                characterPity >= 0 &&
                weaponPity >= 0 &&
                numSimulations > 0 &&
                (characterCopies > 0 || weaponCopies > 0)
              )
            }
          >
            Calculate
          </Button>
        </div>

        {chance >= 0 && (
          <Results
            probability={chance}
            text="Is the probability of you obtaining 1 copie(s) of the character from the
        featured banner and 1copie(s) of the light cone in the featured banner
        if you were to do 1 warp(s), first starting in the character banner
        until you get all desired copies and then moving to the light cone
        banner"
          />
        )}
      </div>
    </main>
  );
}
