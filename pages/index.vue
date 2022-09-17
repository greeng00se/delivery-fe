<template>
  <div>
    <input type="button" @click="store.increment()" value="increment">
    {{ store.count }}
    {{ store.doubleCount }}
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "~~/store/counter";

const store = useCounterStore();
</script>