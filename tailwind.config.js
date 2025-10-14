/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        PrimaryGrayColor: "#1e1e1e",
        SecondaryGrayHeaderBgColor: "#101010",
        cardGray: "rgba(26,25,25,.7)",
        Cobalite: "#978dff",
        MonstrousGreen:"#16CD16",
        Red: "#ff0000",
        EnchantingSapphire:"#2861DB",
        GoldenGinkgo:"#FFF42B",
      }
    },
  },
  plugins: [],
}

