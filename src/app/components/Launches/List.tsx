"use client";
import { Text } from "@/components/Text";
import { Input } from "@/components/ui/input";
import { useListLaunches } from "@/hooks/launchesQuery/useQuery";
import React from "react";
import { useForm, useWatch } from "react-hook-form";

export const List = () => {
  const { register, control } = useForm<{
    search: string;
    results: "success" | "fail";
  }>();

  const { data, isLoading } = useListLaunches();

  const searchWatch = useWatch({ control, name: "search" });

  return (
    <div className="flex w-full flex-wrap justify-center gap-3 rounded bg-accent p-3">
      <Text className="text-right text-sm text-slate-400">
        Registros de lançamentos
      </Text>

      <div className="flex">
        <Input
          placeholder="Nome da missão ou do foguete"
          {...register("search")}
        />
      </div>
    </div>
  );
};
