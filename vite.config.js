import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  include: [
    "@fortawesome/react-fontawesome",
    "@fortawesome/free-solid-svg-icons",
  ],
  alias: {
    leaflet: "leaflet/dist/leaflet.js",
  },
  assetsInclude: ["**/*.png"],
});
