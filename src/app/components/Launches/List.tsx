"use client";
import { Text } from "@/components/Text";
import { Input } from "@/components/ui/input";
import React from "react";

export const List = () => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-3 rounded bg-accent p-3">
      <Text className="text-right text-sm text-slate-400">
        Registros de lançamentos
      </Text>

      <div className="flex">
        <Input placeholder="Nome da missão ou do foguete" />
      </div>
    </div>
  );
};
