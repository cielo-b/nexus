import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        'dark-bg': '#151515',
        'textGrey': '#98989A',
        "danger": "#890000",
        "primary": "#014DFE",
        "black-bg":"#151515",
        "gray-bg":"#E3E3E3"
      },
      boxShadow: {
        "inner-custom": "inset 0px 0px 19.3px 5px rgba(255, 255, 255, 0.25)",
        "inner-custom-dark":
          "inset 1.37px 5.48px 21.4px 0px rgba(29, 29, 29, 0.1)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
