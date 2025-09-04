<template>
  <div class="fixed top-4 right-4 z-50 space-y-3">
    <transition-group name="fade" tag="div">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="rounded-lg shadow-lg px-4 py-3 text-white w-[280px]"
        :class="{
          'bg-green-600': t.type === 'success',
          'bg-red-600': t.type === 'error',
          'bg-blue-600': t.type === 'info',
        }"
      >
        <p class="font-semibold">{{ t.title }}</p>
        <p v-if="t.description" class="text-sm opacity-90">{{ t.description }}</p>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "./index";
const { toasts } = useToast();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
 