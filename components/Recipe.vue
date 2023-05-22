<template>
  <section id="recipe" class="rounded-lg bg-slate-950 text-white p-4">
    <div class="flex gap-4 mb-6">
      <div>
        <span class="text-2xl font-medium"> {{ coffeeAmount }}g </span>
        <span class="text-white text-opacity-80"> coffee </span>
      </div>
      <div>
        <span class="text-2xl font-medium"> {{ recipe.finalWaterAmount }}mL </span>
        <span class="text-white text-opacity-80"> water </span>
      </div>
    </div>
    <ol class="flex gap-1 mb-4" id="pours-viz">
      <li
        v-for="(pour, i) in recipe.allPours"
        class="pour bg-slate-200 text-black px-4 py-2"
        :class="i <= 1 ? 'transition-all transition-300' : ''"
        :style="`width: calc(${(pour * 100) / recipe.finalWaterAmount}%`">
        <div>
          <span class="text-xl font-medium">{{ pour }}mL</span>
          <br />
          <span class="text-black text-opacity-60">
            {{ recipe.totalWaterPerPour[i].toFixed(2).replaceAll(".00", "") }}mL total
          </span>
          <br />
          <span>
            10s pour
            <span v-if="recipe.allPours.at(i + 1)" class="text-black text-opacity-60"
              >/ 45s pause</span
            >
          </span>
        </div>
      </li>
    </ol>
    <div>
      <div>
        <span class="text-2xl font-medium">
          {{ totalBrewTimeInMinutesAndSeconds.replace("0s", "") }}
        </span>
        <span class="text-white text-opacity-80"> total brew time </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Recipe } from "@/utils/createRecipe";
const props = defineProps<{
  recipe: Recipe;
  coffeeAmount: number;
}>();

const { recipe, coffeeAmount } = toRefs(props);

const totalBrewTimeInMinutesAndSeconds = computed(() => {
  const minutes = Math.floor(recipe.value.totalBrewTime / 60);
  const seconds = recipe.value.totalBrewTime - minutes * 60;
  return `${minutes}m ${seconds}s`;
});
</script>

<style lang="postcss" scoped>
#pours-viz {
  .pour {
    /* transition: width 0.3s; */
    @apply rounded;
    &:first-of-type {
      @apply rounded-l-xl;
    }
    &:last-of-type {
      @apply rounded-r-xl;
    }
  }
}
</style>
