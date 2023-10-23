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
        ...optionsReactChart(theme as Theme),
        scales: {
          x: {
            stacked: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  );
};
