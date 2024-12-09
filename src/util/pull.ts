import { ISimulationSettings } from "./simulation-settings/interfaces";
export type PullType = "character" | "weapon";

export function pull(
  settings: ISimulationSettings,
  type: PullType,
  pity: number,
  guaranteed: boolean
): boolean | null {
  const rng = Math.random(); // Generate a random number between 0 and 1

  // Helper function for handling pulls
  function handlePull(
    baseRate: number,
    softPityIncrement: number,
    softPity: number,
    limitedRate: number,
    limitedOptions: number,
    hardPity: number
  ): boolean | null {
    const rate = baseRate + softPityIncrement * Math.max(pity - softPity + 1, 0);

    if (pity + 1 == hardPity) return true; //when reach hard pity instant true

    //if got 5 star
    if (rng <= rate) {
      if (guaranteed) return true; //have garanteed
      if (Math.random() <= limitedRate / limitedOptions) return true; //if win 50/50
      return false; // if lost 50/50
    }
    return null; //if got nothing
  }

  switch (type) {
    case "character":
      return handlePull(
        settings.characterRate.baseRate,
        settings.characterPity.softPityIncrement,
        settings.characterPity.softPity,
        settings.characterRate.limitedRate,
        settings.characterRate.limitedOptions,
        settings.characterPity.hardPity
      );

    case "weapon":
      return handlePull(
        settings.weaponRate.baseRate,
        settings.weaponPity.softPityIncrement,
        settings.weaponPity.softPity,
        settings.weaponRate.limitedRate,
        settings.weaponRate.limitedOptions,
        settings.weaponPity.hardPity
      );
  }
}
