import { ISimulatorInput, simulate } from "../util/simulator";
import { ISimulationSettings } from "../util/simulation-settings/interfaces";

import { expect, test } from "vitest";

const settings: ISimulationSettings = {
  characterPity: {
    hardPity: 90,
    softPity: 74,
    softPityIncrement: 0.06,
  },
  characterRate: {
    baseRate: 0.006,
    guarantedAfter: 1,
    limitedOptions: 1,
    limitedRate: 0.5,
  },
  weaponPity: {
    hardPity: 80,
    softPity: 64,
    softPityIncrement: 0.06,
  },
  weaponRate: {
    baseRate: 0.008,
    guarantedAfter: 1,
    limitedOptions: 2,
    limitedRate: 0.75,
  },
};

const TEST_SIMULATIONS = 10000;

test("Test with a single pull and no garuanteed", () => {
  const input: ISimulatorInput = {
    pulls: 1,
    numSimulations: TEST_SIMULATIONS,

    characterCopies: 1,
    characterPity: 0,
    isCharacterGuaranteed: false,

    isWeaponGuaranteed: false,
    weaponCopies: 0,
    weaponPity: 0,
  };

  const res = simulate(input, settings) * 100;

  //console.log(res);
  expect(res).toBeLessThanOrEqual(0.4); // res <=
  expect(res).toBeGreaterThanOrEqual(0.2); // res >=
});

test("Test with a single pull and garuanteed", () => {
  const input: ISimulatorInput = {
    pulls: 1,
    numSimulations: TEST_SIMULATIONS,

    characterCopies: 1,
    characterPity: 0,
    isCharacterGuaranteed: true,

    isWeaponGuaranteed: false,
    weaponCopies: 0,
    weaponPity: 0,
  };

  const res = simulate(input, settings) * 100;

  //console.log(res);
  expect(res).toBeLessThanOrEqual(0.7); // res <=
  expect(res).toBeGreaterThanOrEqual(0.5); // res >=
});

test("Test with 60 pulls,  garuanteed", () => {
  const input: ISimulatorInput = {
    pulls: 60,
    numSimulations: TEST_SIMULATIONS,

    characterCopies: 1,
    characterPity: 0,
    isCharacterGuaranteed: true,

    isWeaponGuaranteed: false,
    weaponCopies: 0,
    weaponPity: 0,
  };

  const res = simulate(input, settings) * 100;

  //console.log(res);
  expect(res).toBeLessThanOrEqual(31); // res <=
  expect(res).toBeGreaterThanOrEqual(29); // res >=
});

test("Test with 74 pulls,  garuanteed", () => {
  const input: ISimulatorInput = {
    pulls: 74,
    numSimulations: TEST_SIMULATIONS,

    characterCopies: 1,
    characterPity: 0,
    isCharacterGuaranteed: true,

    isWeaponGuaranteed: false,
    weaponCopies: 0,
    weaponPity: 0,
  };

  const res = simulate(input, settings) * 100;

  //console.log(res);
  expect(res).toBeLessThanOrEqual(37); // res <=
  expect(res).toBeGreaterThanOrEqual(34); // res >=
});

test("Test with 80 pity, 1 pull,  garuanteed", () => {
  const input: ISimulatorInput = {
    pulls: 1,
    numSimulations: TEST_SIMULATIONS,

    characterCopies: 1,
    characterPity: 80,
    isCharacterGuaranteed: true,

    isWeaponGuaranteed: false,
    weaponCopies: 0,
    weaponPity: 0,
  };

  const res = simulate(input, settings) * 100;

  //console.log(res);
  expect(res).toBeLessThanOrEqual(37); // res <=
  expect(res).toBeGreaterThanOrEqual(35); // res >=
});

test("Test 90 pulls,  garuanteed", () => {
  const input: ISimulatorInput = {
    pulls: 90,
    numSimulations: TEST_SIMULATIONS,

    characterCopies: 1,
    characterPity: 0,
    isCharacterGuaranteed: true,

    isWeaponGuaranteed: false,
    weaponCopies: 0,
    weaponPity: 0,
  };

  const res = simulate(input, settings) * 100;

  //console.log(res);
  expect(res).toBe(100); // res <=
});
