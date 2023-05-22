<template>
  <main id="home" class="h-full w-full px-2 md:px-4 lg:px-8">
    <section id="parameters" class="mb-12">
      <NConfigProvider preflight-style-disabled>
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
          <div class="col-span-12 col-span-8 xl:col-span-2 rounded-lg border p-4">
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
              <span class="font-medium text-black text-opacity-50">Use ratio</span>
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
                :marks="{
                  1: '',
                  2: '',
                  3: '',
                }" />
              <div class="flex justify-between uppercase text-black text-opacity-60 font-medium select-none">
                <small>Sweeter</small>
                <small>Brighter</small>
              </div>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6 xl:col-span-4 flex flex-col rounded-lg border p-4">
            <label class="block text-lg text-black text-opacity-80 mb-2 font-medium select-none">
              Desired strength
            </label>
            <div class="grow flex flex-col justify-center">
              <NSlider
                v-model:value="desiredStrength"
                :min="0"
                :max="3"
                :marks="{
                  1: '',
                  2: '',
                }" />
              <div class="flex justify-between uppercase text-black text-opacity-60 font-medium select-none">
                <small>Mellow</small>
                <small>Full-bodied</small>
              </div>
            </div>
          </div>
        </div>
      </NConfigProvider>
    </section>
    <div class="mb-2">
      <span class="font-medium text-black text-opacity-60">RECIPE</span>
    </div>
    <Recipe
      :coffee-amount="coffeeAmount || 15"
      :water-amount="waterAmount || 225"
      :desired-profile="desiredProfile"
      :desired-strength="desiredStrength"
      :coffee-ratio="coffeeRatio || 1"
      :water-ratio="waterRatio || 15"
      :use-ratio="useRatio"
      class="mb-4" />
    <button type="button" class="border px-4 py-2 rounded-md">
      <span class="font-medium">Share this recipe</span>
    </button>
  </main>
</template>

<script setup lang="ts">
import { NConfigProvider, NSlider, NCheckbox } from "naive-ui";

const useRatio = ref(true);

const coffeeRatio = ref(1);
const waterRatio = ref(15);

const coffeeAmount = ref(15);
const waterAmount = ref(225);

const desiredProfile = ref(2);
const desiredStrength = ref(0);
</script>
