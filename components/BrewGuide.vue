<template>
  <div>
    {{ count }}
  </div>
</template>

<script setup lang="ts">
import { Recipe } from "~~/utils/createRecipe";

const props = defineProps<{
  recipe: Recipe;
}>();

const { recipe } = toRefs(props);

const timeStart = performance.now();
const count = ref(0);
const tickerInterval = ref(0);

const ticker = () => {
  const timeNow = performance.now();
  count.value = Math.round(timeNow - timeStart);
};

onMounted(() => {
  //@ts-ignore
  tickerInterval.value = setInterval(ticker);
});
</script>
