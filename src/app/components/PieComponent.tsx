"use client";

import { ChartDataset } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "next-themes";

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
        plugins: {
          legend: {
            labels: {
              font: {
                size: 16,
                weight: "700",
              },
              color: theme === "dark" ? "#ffffff" : "#334155",
              boxHeight: 10,
              boxWidth: 10,
              borderRadius: 200,
            },
          },
        },
      }}
    />
  );
};
