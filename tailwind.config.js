/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      screens: {
        mo: { max: "1023px" },
        pc: "1024px",
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
      colors: {
        "opgg-blue": "#5383e8",
        "opgg-gray-text": "#9AA4AF",
        "level-bg": "#1c1c1f",
      },
    },
  },
  plugins: [],
};
