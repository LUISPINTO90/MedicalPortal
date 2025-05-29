<template>
  <div :class="badgeClass">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { cn } from "@/lib/utils";

@Component
export default class Badge extends Vue {
  @Prop({ default: "default" }) variant!: string;

  get badgeClass(): string {
    const baseClass =
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

    const variantClasses: { [key: string]: string } = {
      default:
        "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      secondary:
        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      outline: "text-foreground",
      success:
        "border-transparent bg-green-500 text-white hover:bg-green-500/80",
      warning:
        "border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80",
    };

    return cn(
      baseClass,
      variantClasses[this.variant] || variantClasses.default,
      (this.$attrs as any).class
    );
  }
}
</script>
