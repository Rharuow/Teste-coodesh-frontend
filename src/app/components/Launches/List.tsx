"use client";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useListLaunches } from "@/hooks/launchesQuery/useQuery";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { createPagesList } from "./utils/createPagesList";

const headerTableItems = [
  "Id",
  "Logo",
  "Missão",
  "Data de Lançamento",
  "Foguete",
  "Resultado",
  "Vídeo",
];

export const List = () => {
  const { register, control } = useForm<{
    search: string;
    results: "success" | "fail";
  }>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const searchWatch = useWatch({ control, name: "search" });

  const { data, isLoading } = useListLaunches({
    page,
    limit,
    search: searchWatch,
  });

  const listPages =
    data && createPagesList({ page, totalPages: data.totalPages });

  return (
    <div className="flex w-full flex-wrap justify-center gap-3 rounded bg-accent p-3">
      <Text className="text-right text-sm text-slate-400">
        Registros de lançamentos
      </Text>

      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Nome da missão ou do foguete"
            {...register("search")}
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {headerTableItems.map((item, index) => (
                  <TableHead key={index}>{item}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={headerTableItems.length}>
                    <div className="flex justify-center">
                      <Loading />
                    </div>
                  </TableCell>
                </TableRow>
              ) : data?.results.length ? (
                data.results.map((launch, index) => (
                  <TableRow key={launch.id}>
                    <TableCell>{index}</TableCell>
                    <TableCell>
                      <Image
                        src={
                          launch.links.patch.small ||
                          "/mission-logo-default.png"
                        }
                        alt="Mission's logo"
                        width={30}
                        height={30}
                      />
                    </TableCell>
                    <TableCell>{launch.name}</TableCell>
                    <TableCell>
                      {dayjs(launch.date_local).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>{launch.rocket.name}</TableCell>
                    <TableCell>
                      <Text
                        className={
                          launch.success ? "text-green-500" : "text-red-500"
                        }
                      >
                        {launch.success ? "Sucesso" : "Falhou"}
                      </Text>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={headerTableItems.length}
                    className="h-24 text-center"
                  >
                    Nenhum lançamento encontrado...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            <Text className="text-slate">
              {data?.totalDocs} Lançament
              {data && data.totalDocs && data.totalDocs > 1 ? "os" : "o"}
            </Text>
          </div>
          <div className="flex flex-1 justify-center gap-2 overflow-hidden">
            {listPages?.map((pg) => (
              <Button
                key={pg}
                className={`rounded-full ${
                  pg === page ? "bg-slate-300" : "bg-slate-600 text-white"
                }`}
                disabled={!pg}
                onClick={() => {
                  setPage(Number(pg));
                }}
              >
                {pg ? (
                  <Text className="text-slate">{pg}</Text>
                ) : (
                  <Text className="text-slate">...</Text>
                )}
              </Button>
            ))}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPage((prev) => (prev === 1 ? 0 : prev - 1));
              }}
              disabled={!data?.hasPrev}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPage((prev) =>
                  prev < Number(data?.totalPages)
                    ? prev + 1
                    : Number(data?.totalPages),
                );
              }}
              disabled={!data?.hasNext}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
