<template>
  <div :class="cn('flex flex-col space-y-1.5 p-6', $attrs.class)">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { cn } from "@/lib/utils";

@Component
export default class CardHeader extends Vue {
  cn = cn;
}
</script>
