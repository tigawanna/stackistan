import { defineConfig, loadEnv } from "vite";
import rakkas from "rakkasjs/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
// import analyze from "rollup-plugin-analyzer";
// import { rakkasTanstackQuery } from "./src/lib/tanstack/vite-plugin";

const env = loadEnv("", process.cwd(), "");
Object.assign(process.env, env);

export default defineConfig({
  ssr: {
    external: ["rakkasjs/node-adapter"],
  },
  plugins: [
    tsconfigPaths(),
    react(),
    rakkas({}),
    // rakkasTanstackQuery(),
  ],
  server: {
    port: 3000,
    host: true,
  },
});
