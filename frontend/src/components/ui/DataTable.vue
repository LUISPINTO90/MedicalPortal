<template>
  <div class="w-full">
    <div class="rounded-md border">
      <table class="w-full caption-bottom text-sm">
        <thead class="[&_tr]:border-b">
          <tr
            class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
          >
            <th
              v-for="column in columns"
              :key="column.key"
              class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
              :class="column.headerClass"
            >
              {{ column.title }}
            </th>
            <th
              v-if="showActions"
              class="h-12 px-4 text-right align-middle font-medium text-muted-foreground"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="[&_tr:last-child]:border-0">
          <tr
            v-for="(item, index) in data"
            :key="getItemKey(item, index)"
            class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="p-4 align-middle [&:has([role=checkbox])]:pr-0"
              :class="column.cellClass"
            >
              <slot
                :name="`cell-${column.key}`"
                :item="item"
                :value="getNestedValue(item, column.key)"
              >
                {{ getNestedValue(item, column.key) }}
              </slot>
            </td>
            <td v-if="showActions" class="p-4 align-middle text-right">
              <slot name="actions" :item="item" :index="index" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

interface Column {
  key: string;
  title: string;
  headerClass?: string;
  cellClass?: string;
}

@Component
export default class DataTable extends Vue {
  @Prop({ required: true }) columns!: Column[];
  @Prop({ required: true }) data!: any[];
  @Prop({ default: true }) showActions!: boolean;
  @Prop({ default: "id" }) keyField!: string;

  getItemKey(item: any, index: number): string | number {
    return item[this.keyField] || index;
  }

  getNestedValue(obj: any, path: string): any {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }
}
</script>
