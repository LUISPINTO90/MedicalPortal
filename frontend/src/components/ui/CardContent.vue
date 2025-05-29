<template>
  <div :class="cn('p-6 pt-0', $attrs.class)">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { cn } from "@/lib/utils";

@Component
export default class CardContent extends Vue {
  cn = cn;
}
</script>
