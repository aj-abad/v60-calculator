<template>
  <NConfigProvider preflight-style-disabled :theme-overrides="theme">
    <NuxtPage />
  </NConfigProvider>
</template>

<script setup lang="ts">
import { GlobalThemeOverrides, NConfigProvider } from "naive-ui";

const theme: GlobalThemeOverrides = {
  common: {
    primaryColor: "#080433",
  },
  Slider: {
    dotBoxShadow: "none !important",
    handleBoxShadow: "none !important",
    handleColor: "#080433",
  },
};
</script>

<style></style>
