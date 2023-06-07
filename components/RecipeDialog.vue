<template>
  <div>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="isOpen = false" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel
                class="w-[48rem] transform overflow-hidden rounded-lg bg-white p-4 text-left">
                <DialogTitle as="h3" class="text-2xl font-medium mb-4 text-black">
                  Your recipe has been saved!
                </DialogTitle>
                <div class="flex flex-col gap-2">
                  <p class="text-lg text-black text-opacity-60">
                    Share your recipe with your friends and family by copying the link below:
                  </p>
                  <p class="flex">
                    <a
                      :href="recipeUrl"
                      target="_blank"
                      class="inline-block px-4 py-2 border rounded-md bg-slate-100 text-slate-800">
                      {{ recipeUrl }}
                    </a>
                    <button class="">Copy URL</button>
                  </p>
                  <div>
                    <button
                      type="button"
                      class="border px-4 py-2 rounded-md flex items-center gap-2"
                      @click="isOpen = false">
                      Close
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <button
      type="button"
      class="border px-4 py-2 rounded-md flex items-center gap-2"
      @click="saveRecipe()">
      <Logo class="h-6 w-6 mb-[0.0625rem]" />
      <span class="font-medium">Save this recipe</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import { Recipe } from "~~/utils/createRecipe";

const props = defineProps<{
  recipe: Recipe;
}>();

const isOpen = ref(false);

const { recipe } = toRefs(props);

const recipeUrl = ref("");

const saveRecipe = () => {
  const encoded = encodeRecipe(recipe.value);
  const url = `${window.location.origin}/recipe/${encoded}`;
  recipeUrl.value = url;
  isOpen.value = true;
};

const copyRecipeUrl = () => {
  navigator.clipboard.writeText(recipeUrl.value);
};
</script>

<style lang="postcss" scoped>
.btn-popover {
  .popover {
    transform-origin: bottom center;
    scale: 0;
    translate: 0 -100%;
    opacity: 0;
    transition: 0.2s ease-in-out;
  }
  &:hover,
  &:focus {
    .popover {
      scale: 1;
      opacity: 1;
    }
  }
}
</style>
