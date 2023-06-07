<template>
  <main>
    <div v-if="!recipeIsStarted" class="flex flex-col h-screen items-center justify-center gap-4">
      <div class="w-64">
        {{ actualCountdown }}
        <div class="max-w-xl rounded-lg border p-4">
          <label
            for="countdown"
            class="block text-lg text-black text-opacity-80 mb-2 font-medium select-none">
            Countdown
          </label>
          <div class="flex text-4xl font-medium gap-2">
            <input
              :disabled="actualCountdown !== 0"
              id="countdown"
              type="number"
              class="border-b outline-none"
              :style="`width: ${(countdownSeconds || 3).toString().length}ch`"
              v-model="countdownSeconds"
              placeholder="3" />
            <span class="text-black text-opacity-60 select-none">s</span>
          </div>
        </div>
      </div>
      <button
        @click="startRecipe"
        type="button"
        class="w-[50vmin] aspect-[1/1] rounded-full bg-black text-white flex items-center justify-center">
        <span class="text-[5vmin] leading-[5vmin] font-medium uppercase"> Start </span>
      </button>
    </div>
    <div v-else>
      <ClientOnly>
        <BrewGuide :recipe="recipe!" />
      </ClientOnly>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Recipe } from "~~/utils/createRecipe";

const recipeString = useRoute().params.recipe;
const recipe = ref<Recipe | null>(null);
try {
  const decodedRecipe = decodeRecipe(recipeString?.toString());
  if (!decodedRecipe) throw new Error("Invalid recipe");
  recipe.value = decodedRecipe;
  console.log(decodedRecipe);
} catch (e) {
  useRouter().replace("/");
}

const countdownSeconds = ref(3);
const startTime = ref(0);

const actualCountdown = ref(0);
const recipeIsStarted = ref(false);

const tickerInterval = ref(0);

const ticker = () => {
  const timeNow = performance.now();
  actualCountdown.value = countdownSeconds.value * 1_000 - Math.round(timeNow - startTime.value);
  if (actualCountdown.value <= 0) {
    clearInterval(tickerInterval.value);
    recipeIsStarted.value = true;
  }
};

const startRecipe = () => {
  startTime.value = performance.now();
  //@ts-ignore
  tickerInterval.value = setInterval(ticker, 1);
};
</script>
