"use client";
import { Text } from "@/components/Text";
import { Input } from "@/components/ui/input";
import React from "react";

export const List = async () => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-3 rounded bg-accent p-3">
      <Text className="text-right text-sm text-slate-400">
        Registros de lançamentos
      </Text>

      <div className="flex">
        <Input placeholder="Busque pelo nome da missão" />
      </div>
    </div>
  );
};
