import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { svgstorejs } from './src/vite_plugins/svgstore'
import styleImport, { VantResolve } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({ transformOn: true, mergeProps: true }),
    svgstorejs(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ]
})
