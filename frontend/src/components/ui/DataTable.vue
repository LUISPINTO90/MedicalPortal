<template>
  <div class="w-full">
    <!-- Contenedor con scroll horizontal -->
    <div class="overflow-x-auto rounded-md border">
      <div class="min-w-full inline-block align-middle">
        <table class="w-full caption-bottom text-sm min-w-[600px]">
          <thead class="[&_tr]:border-b">
            <tr
              class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              <th
                v-for="column in columns"
                :key="column.key"
                class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 whitespace-nowrap"
                :class="column.headerClass"
              >
                {{ column.title }}
              </th>
              <th
                v-if="showActions"
                class="h-12 px-4 text-right align-middle font-medium text-muted-foreground whitespace-nowrap"
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
                :class="[
                  column.cellClass,
                  getColumnResponsiveClass(column.key),
                ]"
              >
                <slot
                  :name="`cell-${column.key}`"
                  :item="item"
                  :value="getNestedValue(item, column.key)"
                >
                  <div class="min-w-0">
                    {{ getNestedValue(item, column.key) }}
                  </div>
                </slot>
              </td>
              <td
                v-if="showActions"
                class="p-4 align-middle text-right whitespace-nowrap"
              >
                <slot name="actions" :item="item" :index="index" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
  minWidth?: string;
  responsive?: "hidden-sm" | "hidden-md" | "visible-all";
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

  getColumnResponsiveClass(columnKey: string): string {
    const column = this.columns.find((col) => col.key === columnKey);

    // Si la columna tiene configuración específica de responsive
    if (column?.responsive) {
      switch (column.responsive) {
        case "hidden-sm":
          return "hidden sm:table-cell";
        case "hidden-md":
          return "hidden md:table-cell";
        case "visible-all":
          return "";
        default:
          return "";
      }
    }

    return "";
  }
}
</script>

<style scoped>
/* Mejoras para el scroll horizontal */
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
}

/* Estilos para el scrollbar en webkit */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Asegurar que las celdas no se rompan inadecuadamente */
td,
th {
  min-width: fit-content;
}

/* Responsive breakpoints personalizados si es necesario */
@media (max-width: 640px) {
  .min-w-\[600px\] {
    min-width: 500px;
  }
}
</style>
