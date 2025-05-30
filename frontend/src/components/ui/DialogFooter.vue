<template>
  <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DialogFooter extends Vue {}
</script>
