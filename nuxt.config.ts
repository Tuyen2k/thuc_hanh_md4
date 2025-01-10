import { defineNuxtConfig } from "nuxt/config";


export default defineNuxtConfig ({
  build: {
    transpile: [], // Chỉ định module cần transpile
    extend(config, { isServer }) {
      if (!isServer) {
        // Đảm bảo esbuild xử lý module CommonJS khi cần thiết
        config.module.rules.push({
          test: /\.mjs$/,
          type: 'javascript/auto',
        });
      }
    }
  },

  ssr: false,

  

  compatibilityDate: '2025-01-10'
});