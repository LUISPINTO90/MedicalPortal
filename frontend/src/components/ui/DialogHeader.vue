<template>
  <div class="flex flex-col space-y-1.5 text-center sm:text-left">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DialogHeader extends Vue {}
</script>
