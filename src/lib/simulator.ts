import { pull, PullType } from "./pull";

export interface IRate {
  baseRate: number; ///base % chance to get 5star
  limitedRate: number; ///base % chance for 5* to be the limited  most of the time 50/50
  limitedOptions: number; // number of 5* limited options you can get (eg: weapon banner has 2)
  guarantedAfter: number; // number of base rates you have to win to guarantee the limited 5* you want
}

export interface IPity {
  hardPity: number; // number of pulls after which you are guaranteed to get a 5 star
  softPity: number; // number of pulls after which the chance to get a 5 star start to increase
  softPityIncrement: number; // the increment of the chance to get a 5 star after soft pity
}

export interface ISimulationSettings {
  characterRate: IRate;
  characterPity: IPity;

  weaponRate: IRate;
  weaponPity: IPity;
}

export interface ISimulatorInput {
  pulls: number;
  characterPity: number;
  weaponPity: number;
  isWeaponGuaranteed: boolean;
  isCharacterGuaranteed: boolean;
  characterCopies: number;
  weaponCopies: number;
  numSimulations: number;
}

interface ISimulationData {
  type: PullType;
  obtainedCopies: number;
  currentPity: number;
  isGuaranteed: boolean;
  currentLosses: number;
}

export const DEFAULT_NUM_SIMULATIONS = 10000;

export function simulate(
  input: ISimulatorInput,
  settings: ISimulationSettings
): number {
  let successesfullSimulations = 0;

  for (let i = 0; i < input.numSimulations; i++) {
    let pullsLeft = input.pulls;

    const charData: ISimulationData = {
      type: "character",
      obtainedCopies: 0,
      currentPity: input.characterPity,
      isGuaranteed: input.isCharacterGuaranteed,
      currentLosses: 0,
    };

    const weaponData: ISimulationData = {
      type: "weapon",
      obtainedCopies: 0,
      currentPity: input.weaponPity,
      isGuaranteed: input.isWeaponGuaranteed,
      currentLosses: 0,
    };

    let currentData = charData;

    while (pullsLeft > 0) {
      pullsLeft--;

      currentData =
        charData.obtainedCopies >= input.characterCopies
          ? weaponData
          : charData;

      const succ = pull(
        settings,
        currentData.type,
        currentData.currentPity,
        currentData.isGuaranteed
      );

      if (succ === true) {
        //won 50/50
        currentData.obtainedCopies++;
        currentData.currentPity = 0;
        currentData.isGuaranteed = false;
        currentData.currentLosses = 0;
      } else if (succ === false) {
        //lost 50/50
        currentData.currentLosses++;
        currentData.isGuaranteed =
          currentData.currentLosses >= settings.characterRate.guarantedAfter;
        currentData.currentPity = 0;
      } else {
        //didint get 5 star
        currentData.currentPity++;
      }
    }

    if (
      charData.obtainedCopies >= input.characterCopies &&
      weaponData.obtainedCopies >= input.weaponCopies
    )
      successesfullSimulations++;
  }

  return successesfullSimulations / input.numSimulations;
}
