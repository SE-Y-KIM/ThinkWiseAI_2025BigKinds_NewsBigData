import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#000000',      
        'surface': '#171717',        
        
        // --- 더 진한 금색으로 변경 ---
        'primary': '#B8860B',        // 핵심 강조색 (진한 금색)
        'primary-light': '#DAA520',  // 밝은 금색 (호버 효과용)
        'primary-glow': '#FFD700',   // 반짝이는 금색 (글로우 효과용)
        
        'text-primary': '#E5E5E5',   
        'text-secondary': '#A3A3A3',
        'border-color': '#262626',   
      },
    },
  },
  plugins: [],
};
export default config;
