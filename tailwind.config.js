const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        md: "4px",
      },
      screens: {
        mo: { max: "1023px" },
        pc: "1024px",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        caslon: ["var(--font-caslon)"],
      },
      spacing: {
        xxxs: "2px",
        xxs: "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        xxl: "32px",
        xxxl: "40px",
        nav: "45px",
      },
      colors: {},
      keyframes: {},
      animation: {},
    },
  },
  plugins: [],
};
export default config;
