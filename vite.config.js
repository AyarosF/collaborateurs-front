import { resolve } from "path";
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite config
    plugins: [react()],
    server: {
        host: '127.0.0.1',
        port: 3000
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    resolve: {
      alias: {
        "@page": resolve(__dirname, "./src/views"),
        "@comp": resolve(__dirname, "./src/components"),
      },
    },
  }
})