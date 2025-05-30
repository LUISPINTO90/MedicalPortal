<template>
  <div>
    <!-- Dialog Overlay -->
    <div
      v-if="open"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      @click="handleOverlayClick"
    ></div>

    <!-- Dialog Content -->
    <div
      v-if="open"
      class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      :aria-describedby="descriptionId"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class Dialog extends Vue {
  @Prop({ default: false }) open!: boolean;
  @Prop({ default: true }) closeOnOverlayClick!: boolean;

  titleId = `dialog-title-${Math.random().toString(36).substr(2, 9)}`;
  descriptionId = `dialog-description-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  @Emit("update:open")
  updateOpen(open: boolean) {
    return open;
  }

  handleOverlayClick() {
    if (this.closeOnOverlayClick) {
      this.updateOpen(false);
    }
  }

  mounted() {
    if (this.open) {
      document.body.style.overflow = "hidden";
    }
  }

  beforeDestroy() {
    document.body.style.overflow = "";
  }

  updated() {
    if (this.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
}
</script>
