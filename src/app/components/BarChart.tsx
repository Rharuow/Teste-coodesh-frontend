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

type Metadata = {
  [key: string]: Array<Launch>;
};

type Rocket = {
  _id: string;
  id: string;
  name: string;
  color: string;
  launches: Array<{
    year: string;
    success: boolean;
    id: string;
    _id: string;
  }>;
  __v: number;
};

type Data = {
  rockets: Array<Rocket>;
  metadata: Metadata;
};

export const BarChart = async () => {
  const {
    data: { metadata, rockets },
  } = await api.get<Data>("/stats/bar");

  return (
    <div className="flex w-full flex-wrap justify-center gap-3 rounded bg-accent p-3">
      <Text className="text-center text-sm text-slate-400">
        Lançamentos por ano de cada Foguete
      </Text>
      <BarComponent
        datasets={rockets.map((rocket, index) => ({
          label: rocket.name,
          backgroundColor: rocket.color,
          order: -index,
          data: Object.keys(metadata).map((year) =>
            rocket.launches.some((launch) => launch.year === year)
              ? Number(
                  metadata[year].find(
                    (launch) => launch.year === year && launch.id === rocket.id,
                  )?.amountLaunches,
                )
              : 0,
          ),
          ...(index > 0 && { categoryPercentage: 1 / index }),
        }))}
        labels={Object.keys(metadata)}
      />
    </div>
  );
};
