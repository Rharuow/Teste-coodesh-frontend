import React from "react";

import { Text } from "@/components/Text";
import { api } from "@/service/api";
import { PieComponent } from "./PieComponent";

export const PieChart = async () => {
  const { data } = await api.get<{
    rockets: Array<{
      _id: string;
      id: string;
      name: string;
      color: string;
      launches: Array<unknown>;
    }>;
    metadata: { success: number; fails: number; rocketsTotal: number };
  }>("/stats/pie");

  return (
    <div className="flex w-full flex-wrap justify-center gap-3 rounded bg-accent p-3">
      <Text className="text-right text-sm text-slate-400">
        Lançamentos por foguete
      </Text>
      <PieComponent
        labels={data.rockets.map((rocket) => rocket.name)}
        datasets={[
          {
            data: data.rockets.map((rocket) => rocket.launches.length),
            label: "Número de lançamentos",
            backgroundColor: data.rockets.map((rocket) => rocket.color),
            weight: 700,
          },
        ]}
      />
      <div className="flex w-full flex-col gap-1 bg-accent">
        <Text className="text-right text-sm text-slate-400">
          Resultados dos lançamentos
        </Text>
        <Text className="text-right text-sm font-semibold text-green-500">
          {data.metadata.success} Sucess{data.metadata.success > 1 ? "os" : "o"}
        </Text>

        <Text className="text-right text-sm font-semibold text-red-500">
          {data.metadata.fails} Falh{data.metadata.fails > 1 ? "as" : "a"}
        </Text>
      </div>
    </div>
  );
};
