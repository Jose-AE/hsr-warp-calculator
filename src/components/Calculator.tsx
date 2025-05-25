"use client";

import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Results from "@/components/Results";
import Title from "@/components/Title";
import { ISimulationSettings } from "@/util/simulation-settings/interfaces";
import {
  DEFAULT_NUM_SIMULATIONS,
  ISimulatorInput,
  simulate,
} from "@/util/simulator";
import Image from "next/image";
import { useState } from "react";

interface ICustomization {
  logo: string;
  limitedCategory: string; //5 star , S tier
  pullName: string;
  pullConjugation: string;

  settingsIcon: string;

  characterName: string;
  characterIcon: string;

  weaponName: string;
  weaponIcon: string;
}

interface ICalculatorProps {
  simulationSettings: ISimulationSettings;
  customization: ICustomization;
}

export default function Calculator({
  customization,
  simulationSettings,
}: ICalculatorProps) {
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
      simulationSettings
    );
    setChance(res);
  }

  return (
    <div className="w-full max-w-md p-6 my-12 space-y-4 bg-gray-700 shadow-lg rounded-xl">
      <div className="flex justify-center px-3 py-2 bg-gray-700 border border-gray-600 rounded-md select-none ">
        <Image
          priority
          alt="logo"
          src={customization.logo}
          width={200}
          height={10}
          className="size-auto"
        />
      </div>

      <Title text="Settings" icon={customization.settingsIcon} />

      <section className="flex gap-5">
        <Input
          onChange={(e) => {
            changeValue(e, setPulls);
          }}
          tooltip={`Number of ${
            customization.pullName + customization.pullConjugation
          } to spend`}
          label={customization.pullName + customization.pullConjugation}
          type="number"
          placeholder="0"
          autoComplete="off"
        />

        <Input
          onChange={(e) => {
            changeValue(e, setNumSimulations);
          }}
          defaultValue={DEFAULT_NUM_SIMULATIONS}
          tooltip="Increasing the number of simulations will yield more accurate results but will extend the time required for warp calculations. The more warps you make the longer each simulation takes. Leave default value for best results"
          label="Simulations"
          type="number"
          placeholder="0"
          autoComplete="off"
        />
      </section>

      <Title
        text={customization.characterName}
        icon={customization.characterIcon}
      />

      <section className="flex gap-5">
        <Input
          onChange={(e) => {
            changeValue(e, setCharacterPity);
          }}
          tooltip={`Number of ${
            customization.pullName + customization.pullConjugation
          } since your last ${customization?.limitedCategory} ${
            customization.characterName
          } `}
          label="Pity"
          type="number"
          placeholder="0"
          autoComplete="off"
        />

        <Input
          onChange={(e) => {
            changeValue(e, setCharacterCopies);
          }}
          tooltip={`Desired quantity of ${customization?.limitedCategory} Limited ${customization?.characterName}`}
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

      <Title text={customization.weaponName} icon={customization.weaponIcon} />

      <section className="flex gap-5">
        <Input
          onChange={(e) => {
            changeValue(e, setWeaponPity);
          }}
          tooltip={`Number of ${
            customization.pullName + customization.pullConjugation
          } since your last ${customization?.limitedCategory} ${
            customization.weaponName
          } `}
          label="Pity"
          type="number"
          placeholder="0"
          autoComplete="off"
        />

        <Input
          onChange={(e) => {
            changeValue(e, setWeaponCopies);
          }}
          tooltip={`Desired quantity of ${customization?.limitedCategory} Limited ${customization?.weaponName}`}
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
          body={
            <span className="container mx-auto text-white bg-red-500">
              {weaponCopies > 0 && characterCopies > 0 && (
                <>
                  Is the probability of you obtaining
                  <Tag text={characterCopies} />
                  {characterCopies > 1 ? "copies" : "copy"} of the limited{" "}
                  {customization.characterName.toLowerCase()} from the featured
                  banner and
                  <Tag text={weaponCopies} />
                  {weaponCopies > 1 ? "copies" : "copy"} of the limited{" "}
                  {customization.weaponName} in the featured banner if you were
                  to do <Tag text={pulls} /> {customization.pullName}
                  {pulls > 1 ? customization.pullConjugation : ""}, first
                  starting in the {customization.characterName.toLowerCase()}{" "}
                  banner until you get all desired copies and then moving to the{" "}
                  {customization.weaponName.toLowerCase()} banner
                </>
              )}
              {weaponCopies <= 0 && characterCopies > 0 && (
                <>
                  Is the probability of you obtaining
                  <Tag text={characterCopies} />
                  {characterCopies > 1 ? "copies" : "copy"} of the limited{" "}
                  {customization.characterName.toLowerCase()} from the featured
                  banner if you were to do <Tag text={pulls} />{" "}
                  {customization.pullName}
                  {pulls > 1 ? customization.pullConjugation : ""}
                </>
              )}

              {weaponCopies > 0 && characterCopies <= 0 && (
                <>
                  Is the probability of you obtaining
                  <Tag text={weaponCopies} />
                  {weaponCopies > 1 ? "copies" : "copy"} of the limited{" "}
                  {customization.weaponName.toLowerCase()} from the featured
                  banner if you were to do <Tag text={pulls} />{" "}
                  {customization.pullName}
                  {pulls > 1 ? customization.pullConjugation : ""}
                </>
              )}
            </span>
          }
        />
      )}
    </div>
  );
}

function Tag({ text }: { text: string | number }) {
  return (
    <span className="px-2 py-1 mx-1 text-xs font-medium text-white bg-gray-600 rounded-md shadow-xs select-none ">
      {text}
    </span>
  );
}
