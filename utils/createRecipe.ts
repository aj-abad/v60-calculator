import { RecipeProps } from "~~/types/RecipeProps";

export interface Recipe {
  finalWaterAmount: number;
  allPours: number[];
  totalBrewTime: number;
  totalWaterPerPour: number[];
}

export const createRecipe = (recipe: RecipeProps) => {
  const {
    coffeeAmount,
    coffeeRatio,
    desiredProfile,
    desiredStrength,
    useRatio,
    waterAmount,
    waterRatio,
  } = recipe;

  // amount of water used for the recipe in mL
  const finalWaterAmount = parseFloat(
    (useRatio ? (coffeeAmount / coffeeRatio) * waterRatio : waterAmount).toFixed(2)
  );

  // 40% of the total water amount
  const firstPourTotal = finalWaterAmount * 0.4;

  // splitting the first two pours in the desired ratio
  const firstPourRatio = [0.375, 0.45, 0.5, 0.55, 0.625][desiredProfile];
  const firstTwoPoursRatio = [firstPourRatio, 1 - firstPourRatio];

  // the amount of water for the first two pours in mL
  const firstTwoPoursAmount = (() => {
    const firstPour = firstPourTotal * firstTwoPoursRatio[0];
    const secondPour = firstPourTotal - firstPour;
    return [firstPour, secondPour];
  })();

  // the remainder of the water
  const lastPourTotal = finalWaterAmount - firstPourTotal;

  // how many pours to split the remaining water into
  const lastPoursNumber = desiredStrength + 1;

  // the amount of water for the last pours in mL
  const lastPours = new Array<number>(lastPoursNumber).fill(lastPourTotal / lastPoursNumber);

  // all pours, in mL
  const allPours = [...firstTwoPoursAmount, ...lastPours].map((pour) =>
    parseFloat(pour.toFixed(2))
  );

  // total brew time assuming 10s pours and 45s intervals between pours
  const totalBrewTime = (() => allPours.length * 10 + (allPours.length - 1) * 45)();

  // total water for each step, in mL
  const totalWaterPerPour: number[] = [];
  let totalSoFar = 0;
  allPours.forEach((pour) => {
    totalSoFar += pour;
    totalWaterPerPour.push(totalSoFar);
  });
  return {
    // return this instead of finalWaterAmount because it's more accurate
    finalWaterAmount: totalWaterPerPour.at(-1),
    allPours,
    totalBrewTime,
    totalWaterPerPour,
  } as Recipe;
};

export const encodeRecipe = (recipe: Recipe): string => {
  const json = JSON.stringify(recipe);
  // base64 encode json
  const encoded = window.btoa(json);
  return encoded;
};

export const decodeRecipe = (encoded: string) => {
  try {
    // base64 decode json
    const decoded = window.atob(encoded);
    const json = JSON.parse(decoded);
    return json as Recipe;
  } catch (e) {
    console.error(e);
    return null;
  }
};
