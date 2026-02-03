import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Hoặc @tailwindcss/postcss

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: 'https://github.com/EldlichLord2004/music-gacha', // <--- THAY 'music-gacha' BẰNG TÊN REPO CỦA BẠN
})