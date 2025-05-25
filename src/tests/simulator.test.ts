import { GAMES } from "../lib/games";
import {
  ISimulatorInput,
  simulate,
  ISimulationSettings,
} from "../lib/simulator";

import { expect, test, describe } from "vitest";

const settings: ISimulationSettings = GAMES[0].simulationSettings;
const TEST_SIMULATIONS = 100000;

// Helper function to create base input
const createBaseInput = (
  overrides: Partial<ISimulatorInput> = {}
): ISimulatorInput => ({
  pulls: 1,
  numSimulations: TEST_SIMULATIONS,
  characterCopies: 1,
  characterPity: 0,
  isCharacterGuaranteed: false,
  isWeaponGuaranteed: false,
  weaponCopies: 0,
  weaponPity: 0,
  ...overrides,
});

// Helper function to assert percentage range
const expectPercentageInRange = (result: number, min: number, max: number) => {
  const percentage = result * 100;
  expect(percentage).toBeGreaterThanOrEqual(min);
  expect(percentage).toBeLessThanOrEqual(max);
};

describe("Single Pull Tests", () => {
  test("single pull without guaranteed should have low success rate", () => {
    const input = createBaseInput({
      pulls: 1,
      isCharacterGuaranteed: false,
    });

    const result = simulate(input, settings);
    expectPercentageInRange(result, 0.2, 0.4);
  });

  test("single pull with guaranteed should have low success rate", () => {
    const input = createBaseInput({
      pulls: 1,
      isCharacterGuaranteed: true,
    });

    const result = simulate(input, settings);
    expectPercentageInRange(result, 0.5, 0.7);
  });

  test("single pull at hard pity (90) should guarantee success", () => {
    const input = createBaseInput({
      pulls: 1,
      characterPity: 89, // At 89 pity, next pull is guaranteed
      isCharacterGuaranteed: true,
    });

    const result = simulate(input, settings);
    expect(result).toBe(1); // 100% success rate
  });
});

describe("Multi-Pull Tests with Guaranteed", () => {
  test("60 pulls with guaranteed should have ~30% success rate", () => {
    const input = createBaseInput({
      pulls: 60,
      isCharacterGuaranteed: true,
    });

    const result = simulate(input, settings);
    expectPercentageInRange(result, 29, 31);
  });

  test("74 pulls with guaranteed should have ~35% success rate", () => {
    const input = createBaseInput({
      pulls: 74,
      isCharacterGuaranteed: true,
    });

    const result = simulate(input, settings);
    expectPercentageInRange(result, 34, 37);
  });

  test("90 pulls with guaranteed should have 100% success rate", () => {
    const input = createBaseInput({
      pulls: 90,
      isCharacterGuaranteed: true,
    });

    const result = simulate(input, settings);
    expect(result).toBe(1); // 100% success rate
  });
});

describe("High Pity Tests", () => {
  test("80 pity with 1 pull and guaranteed", () => {
    const input = createBaseInput({
      pulls: 1,
      characterPity: 80,
      isCharacterGuaranteed: true,
    });

    const result = simulate(input, settings);
    expectPercentageInRange(result, 41, 43);
  });

  test("high pity (85) should have increased rates", () => {
    const input = createBaseInput({
      pulls: 1,
      characterPity: 85,
      isCharacterGuaranteed: false,
    });

    const result = simulate(input, settings);
    // Should be higher than base rate due to soft pity
    expect(result * 100).toBeGreaterThan(0.4);
  });
});

describe("Weapon Banner Tests", () => {
  test("weapon pulls with guaranteed", () => {
    const input = createBaseInput({
      pulls: 80,
      characterCopies: 0, // Don't need characters
      weaponCopies: 1,
      isWeaponGuaranteed: true,
    });

    const result = simulate(input, settings);
    expect(result).toBeGreaterThan(0); // Should have some success rate
  });

  test("mixed character and weapon pulls", () => {
    const input = createBaseInput({
      pulls: 160,
      characterCopies: 1,
      weaponCopies: 1,
      isCharacterGuaranteed: true,
      isWeaponGuaranteed: true,
    });

    const result = simulate(input, settings);
    expect(result).toBeGreaterThan(0); // Should have some success rate
  });
});

describe("Edge Cases", () => {
  test("zero pulls should always fail", () => {
    const input = createBaseInput({
      pulls: 0,
    });

    const result = simulate(input, settings);
    expect(result).toBe(0);
  });

  test("requesting zero copies should always succeed", () => {
    const input = createBaseInput({
      pulls: 1,
      characterCopies: 0,
      weaponCopies: 0,
    });

    const result = simulate(input, settings);
    expect(result).toBe(1); // 100% success when requesting nothing
  });

  test("excessive pulls should guarantee success", () => {
    const input = createBaseInput({
      pulls: 1000,
      characterCopies: 1,
      isCharacterGuaranteed: true,
    });

    const result = simulate(input, settings);
    expect(result).toBe(1); // 100% success with many pulls
  });
});

describe("Multiple Copies Tests", () => {
  test("requesting multiple character copies", () => {
    const input = createBaseInput({
      pulls: 300,
      characterCopies: 2,
      isCharacterGuaranteed: true,
    });

    const result = simulate(input, settings);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(1);
  });

  test("requesting multiple weapon copies", () => {
    const input = createBaseInput({
      pulls: 240,
      characterCopies: 0,
      weaponCopies: 2,
      isWeaponGuaranteed: true,
    });

    const result = simulate(input, settings);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(1);
  });
});
