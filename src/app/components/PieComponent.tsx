"use client";

import { ChartDataset } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "next-themes";
import { optionsReactChart } from "./lib/optionsReactChart";
import { Theme } from "@/components/ModeToggle";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieComponent = ({
  labels,
  datasets,
}: {
  labels: Array<string>;
  datasets: Array<ChartDataset<"pie", number[]>>;
}) => {
  const { theme } = useTheme();

  return (
    <Pie
      data={{
        labels,
        datasets,
      }}
      options={{
        // Return default options to style the bar labels and background color according to the theme.
        ...optionsReactChart(theme as Theme),
        plugins: {
          ...optionsReactChart(theme as Theme).plugins,
          legend: {
            ...optionsReactChart(theme as Theme).plugins.legend,
            align: "start",
            position: "bottom",
          },
        },
      }}
    />
  );
};
