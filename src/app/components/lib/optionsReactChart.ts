export const optionsReactChart = (theme: "dark" | "light" | "system") => ({
  plugins: {
    legend: {
      labels: {
        font: {
          size: 12,
          weight: "700",
        },
        color: theme === "dark" ? "#ffffff" : "#334155",
        boxHeight: 10,
        boxWidth: 10,
        borderRadius: 200,
      },
    },
  },
});
