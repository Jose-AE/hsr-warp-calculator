export interface ISimulatorGameSettings {
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

interface IRate {
  baseRate: number; ///base % chance to get 5star
  limitedRate: number; ///base % chance for 5* to be the limited  most of the time 50/50
  limitedOptions: number; // number of 5* limited options you can get (eg: weapon banner has 2)
  guaranteedAfter: number; // number of base rates you have to win to guarantee the limited 5* you want
}

interface IPity {
  hardPity: number; // number of pulls after which you are guaranteed to get a 5 star
  softPity: number; // number of pulls after which the chance to get a 5 star start to increase
  softPityIncrement: number; // the increment of the chance to get a 5 star after soft pity
}

type PullType = "character" | "weapon";

interface ISimulationData {
  type: PullType;
  obtainedCopies: number;
  currentPity: number;
  isGuaranteed: boolean;
  currentLosses: number;
}

export class Simulator {
  constructor(private settings: ISimulatorGameSettings) {}

  /**
   * Simulates the pull system based on the provided input and settings.
   * @param input - The input parameters for the simulation.
   * @returns The success rate of the simulation as a percentage.
   */
  public run(input: ISimulatorInput): number {
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

        const succ = this.simulateSinglePull(
          currentData.type,
          currentData.currentPity,
          currentData.isGuaranteed
        );

        if (succ === true) {
          //got desiried limited 5 star
          currentData.obtainedCopies++;
          currentData.currentPity = 0;
          currentData.isGuaranteed = false;
          currentData.currentLosses = 0;
        } else if (succ === false) {
          //got 5 star but it wasnt the desired limited 5 star
          currentData.currentLosses++;
          currentData.isGuaranteed =
            currentData.currentLosses >=
            this.settings.characterRate.guaranteedAfter;
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

  /**
   * Simulates a single pull for either a character or a weapon.
   * @param type - The type of pull ("character" or "weapon").
   * @param pity - The current pity count when simulating pull.
   * @param guaranteed - Whether the next pull is guaranteed to be a limited 5-star.
   * @return A boolean indicating if the pull was successful (true for a 5-star, false for a 4-star, null for no 5-star).
   */
  private simulateSinglePull(
    type: PullType,
    pity: number,
    guaranteed: boolean
  ): boolean | null {
    // Get the settings based on the type of pull
    const { baseRate, limitedRate, limitedOptions } =
      type === "character"
        ? this.settings.characterRate
        : this.settings.weaponRate;
    const { softPityIncrement, softPity, hardPity } =
      type === "character"
        ? this.settings.characterPity
        : this.settings.weaponPity;
    //////////

    // Calculate the current rate of getting a 5-star based on pity and soft pity
    const rate =
      baseRate + softPityIncrement * Math.max(pity - softPity + 1, 0);

    //when reach hard pity instant true
    if (pity + 1 == hardPity) return true;

    //if got 5 star
    if (this.rng(rate)) {
      //if guaranteed limited
      if (guaranteed) {
        //if multiple limited options gamble to try and get the specific limited
        if (this.rng(1 / limitedOptions)) return true; //have garanteed
        else return false; //if lost try to get the specific limited
      }
      //if won 50/50
      if (this.rng(limitedRate)) {
        //if multiple limited options gamble to try and get the specific limited
        if (this.rng(1 / limitedOptions)) return true; //have garanteed
        else return false; //if lost try to get the specific limited
      }
      return false; // if lost 50/50
    }

    //if got nothing
    return null;
  }

  /**
   * Generates a random number to simulate the RNG behavior.
   * Example: If the chance is 0.5, there's a 50% chance of returning true.
   * @param chance - The chance of success.
   * @returns A boolean indicating if the RNG condition was met.
   */
  private rng(chance: number): boolean {
    const rng = Math.random(); // Generate a random number between 0 and 1
    return rng <= chance; // Return true if the random number is less than the chance
  }
}
