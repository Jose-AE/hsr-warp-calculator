import { pull, PullType } from "./pull";
import { ISimulationSettings } from "./simulation-settings/interfaces";

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
