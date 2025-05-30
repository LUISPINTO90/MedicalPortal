// src/utils/timeFormatter.ts

/**
 * Formatea una fecha ISO a formato local mexicano con hora
 * @param dateString - Fecha en formato ISO (ej: "2025-05-29T23:25:14.498Z")
 * @returns Fecha formateada (ej: "29/05/2025 - 10:20 p. m.")
 */
export function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    // Formatear fecha (DD/MM/YYYY)
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    // Formatear hora (HH:MM AM/PM)
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "p. m." : "a. m.";
    const displayHours = hours % 12 || 12;

    return `${day}/${month}/${year} - ${displayHours}:${minutes} ${ampm}`;
  } catch (error) {
    return "Error al formatear fecha";
  }
}

/**
 * Formatea solo la fecha sin hora
 * @param dateString - Fecha en formato ISO
 * @returns Fecha formateada (ej: "29/05/2025")
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    return "Error al formatear fecha";
  }
}

/**
 * Formatea solo la hora
 * @param dateString - Fecha en formato ISO
 * @returns Hora formateada (ej: "10:20 p. m.")
 */
export function formatTime(dateString: string): string {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Hora inválida";
    }

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "p. m." : "a. m.";
    const displayHours = hours % 12 || 12;

    return `${displayHours}:${minutes} ${ampm}`;
  } catch (error) {
    return "Error al formatear hora";
  }
}

/**
 * Formatea fecha de manera más legible (ej: "29 de mayo de 2025")
 * @param dateString - Fecha en formato ISO
 * @returns Fecha formateada de manera legible
 */
export function formatDateReadable(dateString: string): string {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return "Error al formatear fecha";
  }
}

/**
 * Formatea fecha y hora de manera completa y legible
 * @param dateString - Fecha en formato ISO
 * @returns Fecha y hora formateadas de manera legible
 */
export function formatDateTimeReadable(dateString: string): string {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    return date.toLocaleString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    return "Error al formatear fecha";
  }
}

/**
 * Calcula tiempo transcurrido desde una fecha (ej: "hace 2 horas")
 * @param dateString - Fecha en formato ISO
 * @returns Tiempo transcurrido
 */
export function getTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();

    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return "hace unos segundos";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `hace ${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""}`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `hace ${diffInDays} día${diffInDays > 1 ? "s" : ""}`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `hace ${diffInMonths} mes${diffInMonths > 1 ? "es" : ""}`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `hace ${diffInYears} año${diffInYears > 1 ? "s" : ""}`;
  } catch (error) {
    return "Error al calcular tiempo";
  }
}

/**
 * Verifica si una fecha es de hoy
 * @param dateString - Fecha en formato ISO
 * @returns true si la fecha es de hoy
 */
export function isToday(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    const today = new Date();

    return date.toDateString() === today.toDateString();
  } catch (error) {
    return false;
  }
}

/**
 * Verifica si una fecha es de ayer
 * @param dateString - Fecha en formato ISO
 * @returns true si la fecha es de ayer
 */
export function isYesterday(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return date.toDateString() === yesterday.toDateString();
  } catch (error) {
    return false;
  }
}

/**
 * Formatea fecha con contexto relativo (hoy, ayer, o fecha completa)
 * @param dateString - Fecha en formato ISO
 * @returns Fecha con contexto relativo
 */
export function formatDateWithContext(dateString: string): string {
  if (isToday(dateString)) {
    return `Hoy - ${formatTime(dateString)}`;
  }

  if (isYesterday(dateString)) {
    return `Ayer - ${formatTime(dateString)}`;
  }

  return formatDateTime(dateString);
}
