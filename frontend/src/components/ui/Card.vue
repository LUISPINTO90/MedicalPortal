<template>
  <div
    :class="
      cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        $attrs.class
      )
    "
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { cn } from "@/lib/utils";

@Component
export default class Card extends Vue {
  cn = cn;
}
</script>
