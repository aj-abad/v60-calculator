<template>
  <main id="home" class="h-full w-full p-12">
    <h1 class="text-6xl font-medium mb-2">Simple V60 recipe calculator</h1>
    <p class="text-2xl text-black text-opacity-60">
      A simple V60 recipe calculator based on Tetsu Kasuya's 4:6 method.
    </p>
    <hr class="my-8" />
    <div class="flex">
      <div class="grow">
        <label class="block text-lg text-black text-opacity-40 mb-2"> Coffee to water ratio </label>
        <div class="flex text-4xl font-medium gap-2">
          <button class="cursor-ns-resize">{{ coffeeRatio }}</button>
          <span class="text-black text-opacity-60">:</span>
          <button class="cursor-ns-resize">{{ waterRatio }}</button>
        </div>
      </div>
      <div class="grow">
        <label class="block text-lg text-black text-opacity-40 mb-2"> Coffee amount </label>
        <div class="flex text-4xl font-medium gap-2">
          <input type="number" class="border-b outline-none w-[2ch]" v-model="coffeeAmount">
          <span class="text-black text-opacity-60">g</span>
        </div>
      </div>
      <div class="grow">
        <label class="block text-lg text-black text-opacity-40 mb-2"> Desired profile </label>
      </div>
      <div class="grow">
        <label class="block text-lg text-black text-opacity-40 mb-2"> Desired strength </label>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const coffeeRatio = ref(1);
const waterRatio = ref(15);

const coffeeAmount = ref(15);

</script>
