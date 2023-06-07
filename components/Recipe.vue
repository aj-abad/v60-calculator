<template>
  <section id="recipe" class="rounded-lg bg-slate-950 text-white p-4">
    <div class="flex gap-4 mb-6">
      <div>
        <span class="text-2xl font-medium"> {{ recipe.coffeeAmount }}g </span>
        <span class="text-white text-opacity-80"> coffee </span>
      </div>
      <div>
        <span class="text-2xl font-medium"> {{ recipe.finalWaterAmount }}mL </span>
        <span class="text-white text-opacity-80"> water </span>
      </div>
      <div class="ml-auto">
        <span class="text-2xl font-medium">
          {{ totalBrewTimeInMinutesAndSeconds.replace("m 0s", "m") }}
        </span>
        <span class="text-white text-opacity-80"> total brew time </span>
      </div>
    </div>
    <ol class="flex flex-col h-[max(50vh,32rem)] md:h-auto md:flex-row gap-1 mb-4" id="pours-viz">
      <li
        v-for="(pour, i) in recipe.allPours"
        class="pour md:bg-slate-100 text-white md:text-black h-[var(--percentage)] md:h-auto md:w-[var(--percentage)] flex"
        :class="i <= 1 ? 'transition-all transition-300' : ''"
        :style="`--percentage: ${(pour * 100) / recipe.finalWaterAmount}%`">
        <div
          role="presentation"
          class="pour-visualization-sm h-full shrink-0 w-2 bg-slate-100 md:hidden"></div>
        <div class="grow h-full px-4 py-2">
          <span class="text-xl font-medium">{{ pour }}mL</span>
          <br />
          <span class="opacity-60">
            {{ recipe.totalWaterPerPour[i].toFixed(2).replaceAll(".00", "") }}mL total
          </span>
          <br />
          <span>
            10s pour
            <span v-if="recipe.allPours.at(i + 1)" class="opacity-60">/ 45s pause</span>
          </span>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { Recipe } from "@/utils/createRecipe";
const props = defineProps<{
  recipe: Recipe;
}>();

const { recipe } = toRefs(props);

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
      .pour-visualization-sm {
        @apply rounded-t-xl;
      }
    }
    &:last-of-type {
      @apply rounded-r-xl;
      .pour-visualization-sm {
        @apply rounded-b-xl;
      }
    }
  }
}
</style>
