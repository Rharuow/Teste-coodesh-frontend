"use client";
import React, { useState } from "react";
import Lottie from "lottie-react";
import dayjs from "dayjs";
import Image from "next/image";
import { useForm, useWatch } from "react-hook-form";

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

import { createPagesList } from "./utils/createPagesList";

import empty from "@public/no-launches.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterParams } from "@/service/resources/launches";
import Link from "next/link";
import { VideoOff, Youtube } from "lucide-react";

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
  const { register, control, setValue } = useForm<{
    search: string;
    results: FilterParams["results"];
    limit?: FilterParams["limit"];
  }>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const searchWatch = useWatch({ control, name: "search" });
  const resultsWatch = useWatch({ control, name: "results" });
  const limitWatch = useWatch({ control, name: "limit" });

  const { data, isLoading } = useListLaunches({
    page,
    limit,
    search: searchWatch,
    results: resultsWatch,
  });

  const listPages =
    data && createPagesList({ page, totalPages: data.totalPages });

  return (
    <div className="flex w-full flex-wrap justify-center gap-3 rounded bg-accent p-3">
      <Text className="text-right text-sm text-slate-400">
        Registros de lançamentos
      </Text>

      <div className="w-full">
        <div className="flex items-center gap-3 py-4">
          <input type="hidden" {...register("results")} />
          <input type="hidden" {...register("limit")} />
          <Input
            placeholder="Nome da missão ou do foguete"
            {...register("search", { onChange: () => setPage(1) })}
          />
          <Select
            onValueChange={(value) => {
              value !== "all"
                ? setValue("results", value as FilterParams["results"])
                : setValue("results", undefined);
              setPage(1);
            }}
          >
            <SelectTrigger className="max-w-[130px]">
              <SelectValue placeholder="Resultados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="success">Sucesso</SelectItem>
              <SelectItem value="fail">Falha</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="max-w-[80px]">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent>
              {Array(10)
                .fill(null)
                .map((_, index) => (
                  <SelectItem key={index} value={String((index + 1) * 5)}>
                    {(index + 1) * 5}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
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
                    <TableCell>
                      {launch.links.webcast ? (
                        <Link target="_blank" href={launch.links.webcast}>
                          <Youtube />
                        </Link>
                      ) : (
                        <VideoOff />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={headerTableItems.length}
                    className="h-24 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Lottie
                        className="w-[220px]"
                        animationData={empty}
                        loop={true}
                      />
                      <Text className="text-slate">
                        Nenhum Lançamento encontrado...
                      </Text>
                    </div>
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
            {listPages?.map((pg, index) => (
              <Button
                key={index}
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
