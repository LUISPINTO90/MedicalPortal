<template>
  <input
    :class="inputClass"
    :value="value"
    v-bind="$attrs"
    @input="handleInput"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { cn } from "@/lib/utils";

@Component
export default class Input extends Vue {
  @Prop({ default: "" }) value!: string;

  get inputClass(): string {
    return cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      (this.$attrs as any).class
    );
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.$emit("input", target.value);
  }
}
</script>
