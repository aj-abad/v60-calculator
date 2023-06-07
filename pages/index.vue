<template>
  <header class="px-2 md:px-4 lg:px-8 px-2 pt-4 lg:pt-8 select-none">
    <h1 class="text-4xl lg:text-6xl font-medium mb-2">Simple V60 recipe calculator</h1>
    <p class="text-lg lg:text-2xl text-black text-opacity-60">
      A simple calculator based on Tetsu Kasuya's 4:6 method.
    </p>
    <hr class="my-4 lg:my-8" />
  </header>
  <ClientOnly>
    <main id="home" class="h-full w-full px-2 md:px-4 lg:px-8 pb-4">
      <section id="parameters" class="mb-12">
        <div class="mb-4">
          <span class="font-medium text-black text-opacity-60 select-none">PARAMETERS</span>
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-4 xl:col-span-2 rounded-lg border p-4">
            <label
              for="coffee-amount"
              class="select-none block text-lg text-black text-opacity-80 mb-2 font-medium">
              Coffee amount
            </label>
            <div class="flex text-4xl font-medium gap-2">
              <input
                id="coffee-amount"
                type="number"
                class="border-b outline-none"
                :style="`width: ${(coffeeAmount || 15).toString().length}ch`"
                v-model="coffeeAmount"
                placeholder="15" />
              <span class="text-black text-opacity-60 select-none">g</span>
            </div>
          </div>
          <div class="col-span-12 md:col-span-8 xl:col-span-2 rounded-lg border p-4">
            <label
              class="select-none block text-lg text-black text-opacity-80 font-medium mb-2"
              :for="useRatio ? 'coffee-ratio' : 'water-amount'">
              Water amount
            </label>
            <div class="mb-2 h-">
              <div class="flex text-4xl font-medium gap-2 mb-2" v-if="useRatio">
                <input
                  id="coffee-ratio"
                  aria-label="coffee ratio"
                  placeholder="1"
                  type="number"
                  class="border-b outline-none"
                  :style="`width: ${(coffeeRatio || 1).toString().length}ch`"
                  v-model="coffeeRatio" />
                <span class="text-black text-opacity-60 select-none" role="presentation">:</span>
                <input
                  id="water-ratio"
                  aria-label="water ratio"
                  placeholder="15"
                  type="number"
                  class="border-b outline-none"
                  :style="`width: ${(waterRatio || 15).toString().length}ch`"
                  v-model="waterRatio" />
              </div>
              <div class="flex text-4xl font-medium gap-2" v-else>
                <input
                  id="water-amount"
                  type="number"
                  class="border-b outline-none w-[3ch]"
                  v-model="waterAmount"
                  placeholder="225" />
                <span class="text-black text-opacity-60">mL</span>
              </div>
            </div>
            <n-checkbox v-model:checked="useRatio">
              <span class="font-medium text-black text-opacity-80">Use ratio</span>
            </n-checkbox>
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-4 flex flex-col rounded-lg border p-4">
            <label class="block text-lg text-black text-opacity-80 mb-2 font-medium select-none">
              Desired profile
            </label>
            <div>
              <NSlider
                class="mb-2"
                v-model:value="desiredProfile"
                :min="0"
                :max="4"
                :show-tooltip="false"
                :tooltip="false"
                :marks="{
                  1: '',
                  2: '',
                  3: '',
                }" />
              <div
                class="flex justify-between uppercase text-black text-opacity-60 font-medium select-none">
                <small>Sweeter</small>
                <small>Brighter</small>
              </div>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-4 flex flex-col rounded-lg border p-4">
            <label class="block text-lg text-black text-opacity-80 mb-2 font-medium select-none">
              Desired strength
            </label>
            <div>
              <NSlider
                v-model:value="desiredStrength"
                :min="0"
                :max="3"
                :show-tooltip="false"
                :tooltip="false"
                :marks="{
                  1: '',
                  2: '',
                }" />
              <div
                class="flex justify-between uppercase text-black text-opacity-60 font-medium select-none">
                <small>Mellow</small>
                <small>Full-bodied</small>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="mb-2">
        <span class="font-medium text-black text-opacity-60">RECIPE</span>
      </div>
      <Recipe :recipe="recipe" class="mb-4" />
      <RecipeDialog :recipe="recipe" />
    </main>
  </ClientOnly>
</template>

<script setup lang="ts">
import { NCheckbox, NSlider } from "naive-ui";

const useRatio = ref(true);

const coffeeRatio = ref(1);
const waterRatio = ref(15);

const coffeeAmount = ref(15);
const waterAmount = ref(225);

const desiredProfile = ref(2);
const desiredStrength = ref(0);

const recipe = computed(() =>
  createRecipe({
    useRatio: useRatio.value,
    coffeeRatio: coffeeRatio.value || 1,
    waterRatio: waterRatio.value || 15,
    coffeeAmount: coffeeAmount.value || 15,
    waterAmount: waterAmount.value || 225,
    desiredProfile: desiredProfile.value,
    desiredStrength: desiredStrength.value,
  })
);
</script>
