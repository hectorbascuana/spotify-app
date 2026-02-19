/** @type {import('tailwindcss').Config} */
module.exports = {
  // Rutas donde usarás estilos [cite: 32]
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#FA243C',     // Rojo Apple Music
        secondary: '#8E8E93',   // Gris subtítulos
        background: '#FFFFFF',  // Blanco limpio
        surface: '#F2F2F7',     // Gris claro para secciones
      },
    },
  },
  plugins: [],
}