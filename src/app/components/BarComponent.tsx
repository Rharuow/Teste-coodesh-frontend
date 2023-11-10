"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ChartDataset,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Theme } from "@/components/ModeToggle";

import { optionsReactChart } from "./lib/optionsReactChart";

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const BarComponent = ({
  labels,
  datasets,
}: {
  labels: Array<string>;
  datasets: Array<ChartDataset<"bar", number[]>>;
}) => {
  const { theme } = useTheme();
  return (
    <Bar
      data={{
        labels,
        datasets,
      }}
      height={200}
      options={{
        // Return default options to style the bar labels and background color according to the theme.
        ...optionsReactChart(theme as Theme),
        scales: {
          x: {
            // This property enables the bars to overlap on the x-axis.
            stacked: true,
          },
          y: {
            // Ensuring that the charts start from zero on the y-axis.
            beginAtZero: true,
          },
        },
      }}
    />
  );
};
