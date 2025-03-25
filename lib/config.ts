export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // En el navegador, usa la URL actual
    return window.location.origin;
  }
  // En el servidor, usa NEXT_PUBLIC_APP_URL o la URL por defecto
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}; 