import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterParams } from "@/service/resources/launches";
import React from "react";
import { useFormContext } from "react-hook-form";

export const ResultSelect = ({
  setPage,
}: {
  setPage: (value: React.SetStateAction<number>) => void;
}) => {
  const { setValue } = useFormContext();
  return (
    <Select
      onValueChange={(value) => {
        value !== "all"
          ? setValue("results", value as FilterParams["results"])
          : setValue("results", undefined);
        setPage(1);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Resultados" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos</SelectItem>
        <SelectItem value="success">Sucesso</SelectItem>
        <SelectItem value="fail">Falha</SelectItem>
      </SelectContent>
    </Select>
  );
};
