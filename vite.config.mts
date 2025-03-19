import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import eslint from 'vite-plugin-eslint'

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
    },
    build: {
      outDir: 'build',
      chunkSizeWarningLimit: 1000,
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      viteTsconfigPaths(),
      eslint(),
    ],
  }
})
