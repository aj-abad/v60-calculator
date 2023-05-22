<template>
  <section id="recipe" class="rounded-lg bg-slate-950 text-white p-4">
    <div class="flex gap-4 mb-6">
      <div>
        <span class="text-2xl font-medium"> {{ coffeeAmount }}g </span>
        <span class="text-white text-opacity-80"> coffee </span>
      </div>
      <div>
        <span class="text-2xl font-medium"> {{ finalWaterAmount }}mL </span>
        <span class="text-white text-opacity-80"> water </span>
      </div>
    </div>
    <div class="flex gap-1 mb-4" id="pours-viz">
      <div
        v-for="(pour, i) in allPours"
        class="pour bg-slate-200 text-black px-4 py-2"
        :style="`width: calc(${(pour * 100) / finalWaterAmount}%`">
        <div>
          <span class="text-xl font-medium">{{ pour }}mL</span>
          <br />
          <span class="text-black text-opacity-60">
            {{
              allPours
                .slice(0, i + 1)
                .reduce((a, b) => a + b, 0)
                .toFixed(2)
                .replaceAll(".00", "")
            }}mL total
          </span>
          <br />
          <span>
            10s pour
            <span v-if="allPours.at(i + 1)" class="text-black text-opacity-60">/ 45s pause</span>
          </span>
        </div>
      </div>
    </div>
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
import { RecipeProps } from "@/types/RecipeProps";
const props = withDefaults(defineProps<RecipeProps>(), {
  desiredProfile: 50,
  desiredStrength: 50,
  useRatio: true,
  coffeeRatio: 1,
  waterRatio: 15,
  coffeeAmount: 15,
  waterAmount: 225,
});
const {
  desiredProfile,
  desiredStrength,
  useRatio,
  coffeeRatio,
  waterRatio,
  coffeeAmount,
  waterAmount,
} = toRefs(props);

const finalWaterAmount = computed(() =>
  parseFloat(
    (useRatio.value
      ? (coffeeAmount.value / coffeeRatio.value) * waterRatio.value
      : waterAmount.value
    ).toFixed(2)
  )
);

const firstPourTotal = computed(() => finalWaterAmount.value * 0.4);

const firstTwoPoursRatio = computed(() => {
  const firstPourRatio = [0.375, 0.45, 0.5, 0.55, 0.625][desiredProfile.value];
  return [firstPourRatio, 1 - firstPourRatio];
});

const firstTwoPoursAmount = computed(() => {
  const firstPour = firstPourTotal.value * firstTwoPoursRatio.value[0];
  const secondPour = firstPourTotal.value - firstPour;
  return [firstPour, secondPour].map((pour) => parseFloat(pour.toFixed(2)));
});

const lastPourTotal = computed(() => finalWaterAmount.value - firstPourTotal.value);

const lastPoursNumber = computed(() => desiredStrength.value + 1);

const lastPours = computed(() =>
  new Array(lastPoursNumber.value).fill(lastPourTotal.value / lastPoursNumber.value)
);

const allPours = computed(() => [...firstTwoPoursAmount.value, ...lastPours.value]);

const totalBrewTime = computed(() => allPours.value.length * 10 + (allPours.value.length - 1) * 45);
const totalBrewTimeInMinutesAndSeconds = computed(() => {
  const minutes = Math.floor(totalBrewTime.value / 60);
  const seconds = totalBrewTime.value - minutes * 60;
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
