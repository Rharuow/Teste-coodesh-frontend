import { Text } from "@/components/Text";
import { api } from "@/service/api";
import React from "react";

export const PieChart = async () => {
  const { data } = await api.get("/stats/pie");
  console.log(data);
  return (
    <div className="bg-accent p-3">
      <div className="flex flex-col gap-3">
        <div className="p-2 bg-green-500 rounded">
          <Text className="text-center">Succeso: {data.metadata.success}</Text>
        </div>

        <div className="p-2 bg-red-500 rounded">
          <Text className="text-center">Falha: {data.metadata.fails}</Text>
        </div>
      </div>
    </div>
  );
};
