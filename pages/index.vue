<template>
  <div class="d-flex align-center flex-column">
    {{ store.count }}
    {{ store.doubleCount }}
    <v-icon large color="green darken-2">mdi-domain</v-icon>
    <v-btn color="primary" elevation="2" @click="store.increment()" outlined rounded>Click</v-btn>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "~~/store/counter";

const store = useCounterStore();
</script>
