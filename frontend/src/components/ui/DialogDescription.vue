<template>
  <p
    :id="id || `dialog-description-${Math.random().toString(36).substr(2, 9)}`"
    class="text-sm text-muted-foreground"
  >
    <slot />
  </p>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class DialogDescription extends Vue {
  @Prop({ default: "" }) id!: string;
}
</script>
