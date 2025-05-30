<template>
  <h2
    :id="id || `dialog-title-${Math.random().toString(36).substr(2, 9)}`"
    class="text-lg font-semibold leading-none tracking-tight"
  >
    <slot />
  </h2>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class DialogTitle extends Vue {
  @Prop({ default: "" }) id!: string;
}
</script>
