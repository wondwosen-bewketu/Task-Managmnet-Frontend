/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Specify where Tailwind should look for classes
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6c63ff", // Cool purple for primary branding
        secondary: "#1a1a1a", // Rich black for text and elements
        accent: "#f3f4f6", // Clean light gray for backgrounds
        background: "#ffffff", // Pure white for the main background
        textDark: "#333333", // Dark gray for softer text
        textLight: "#e5e5e5", // Lighter gray for accents
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Modern, clean sans-serif font
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)", // Clean shadow for cards
        button: "0 2px 10px rgba(108, 99, 255, 0.6)", // Glow effect for buttons
        modal: "0 6px 15px rgba(0, 0, 0, 0.2)", // Shadow for modals
      },
      borderRadius: {
        "4xl": "2rem", // Rounded corners for a modern look
        xl: "1rem", // Slightly rounded elements
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out", // Smooth fade-in animation
        pulseSlow: "pulse 3s infinite", // Slow pulse for attention-grabbing elements
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Enhances form styling
    require("@tailwindcss/typography"), // Typography plugin for detailed text
    require("@tailwindcss/aspect-ratio"), // Aspect ratio management
  ],
};
