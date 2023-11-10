import { api } from "@/service/api";
import React from "react";
import { BarComponent } from "./BarComponent";
import { Text } from "@/components/Text";

type Launch = {
  amountLaunches: number;
  launch_id: string;
  year: string;
  id: string;
  name: string;
  color: string;
};

type LaunchesPerYear = {
  [year: string]: Array<Launch>;
};

type RocketLaunch = {
  year: string;
  success: boolean;
  id: string;
  _id: string;
};

type Rocket = {
  _id: string;
  id: string;
  name: string;
  color: string;
  launches: Array<RocketLaunch>;
  __v: number;
};

type Resource = {
  rockets: Array<Rocket>;
  metadata: LaunchesPerYear;
};

export const BarChart = async () => {
  const {
    data: { metadata: launchesPerYear, rockets: rocketsLaunchesPerYear },
  } = await api.get<Resource>("/stats/bar");

  const getLaunchesPerYears = ({ rocket }: { rocket: Rocket }) =>
    Object.keys(launchesPerYear).map((year) =>
      rocket.launches.some((launch) => launch.year === year)
        ? Number(
            launchesPerYear[year].find(
              (launch) => launch.year === year && launch.id === rocket.id,
            )?.amountLaunches,
          )
        : 0,
    );

  const getRocketLaunchesPerYear = () =>
    rocketsLaunchesPerYear.map((rocket, index) => ({
      // Label for bar chart.
      label: rocket.name,
      // Color for bar chart.
      backgroundColor: rocket.color,
      // Bring forward the smallest bars, meaning the rockets with fewer launches are brought to the forefront.
      order: -index,
      // Array of the number of rocket launches per year.
      data: getLaunchesPerYears({ rocket }),
      // Width scale spacing between each rocket launch data.
      ...(index > 0 && { categoryPercentage: 1 / index }),
    }));

  return (
    <div className="flex w-full flex-wrap justify-center gap-3 rounded bg-accent p-3">
      <Text className="text-center text-sm text-slate-400">
        Lançamentos por ano de cada Foguete
      </Text>
      <BarComponent
        datasets={getRocketLaunchesPerYear()}
        labels={Object.keys(launchesPerYear)}
      />
    </div>
  );
};
