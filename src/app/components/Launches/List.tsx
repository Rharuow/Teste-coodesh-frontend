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
import {
  ChevronLeft,
  ChevronRight,
  RocketIcon,
  Share2,
  VideoOff,
  Youtube,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePathname, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();

  console.log(params.get("search"));
  console.log(searchParams.getAll("search"));

  const { register, control, setValue } = useForm<{
    search: string;
    results: FilterParams["results"];
    limit?: FilterParams["limit"];
  }>({
    defaultValues: {
      search: params.get("search") ?? "",
      results:
        params.get("results") === "fail" || params.get("results") === "success"
          ? (params.get("results") as "fail" | "success")
          : undefined,
    },
  });
  const [page, setPage] = useState(
    params.get("page") ? Number(params.get("page")) : 1,
  );
  const [limit, setLimit] = useState(Number(params.get("limit")) || 5);
  const searchWatch = useWatch({ control, name: "search" });
  const resultsWatch = useWatch({ control, name: "results" });

  const { data, isLoading } = useListLaunches({
    page,
    limit,
    search: searchWatch,
    results: resultsWatch,
  });

  const listPages =
    data && createPagesList({ page, totalPages: data.totalPages });

  const handleShareSearchLaunches = () => {
    let linkShared = `${process.env.NEXT_PUBLIC_BASE_URL}/?limit=${limit}&page=${page}`;

    if (resultsWatch) linkShared = linkShared + `&results=${resultsWatch}`;
    if (searchWatch) linkShared = linkShared + `&search=${searchWatch}`;

    navigator.clipboard.writeText(linkShared);
  };

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3 rounded bg-accent p-3">
      <Text className="text-right text-sm text-slate-400">
        Registros de lançamentos
      </Text>
      <Button
        className="md:hidden"
        size={"icon"}
        variant={"outline"}
        onClick={() => handleShareSearchLaunches()}
      >
        <Share2 size={14} />
      </Button>
      <div className="flex text-xs md:items-center md:gap-3 md:text-sm">
        <Text className="hidden text-muted-foreground md:inline">
          {data?.totalDocs} Lançament
          {data && data.totalDocs && data.totalDocs > 1 ? "os" : "o"}
        </Text>
        <Text className="text-muted-foreground md:hidden">
          {data?.totalDocs} Total
        </Text>
        <Button
          className="hidden md:flex"
          size={"icon"}
          variant={"outline"}
          onClick={() => handleShareSearchLaunches()}
        >
          <Share2 size={14} />
        </Button>
      </div>

      <div className="w-full">
        <div className="flex flex-col items-center gap-3 py-4 md:flex-row">
          <input type="hidden" {...register("results")} />
          <input type="hidden" {...register("limit")} />
          <Input
            className="grow"
            placeholder="Nome da missão ou do foguete"
            {...register("search", {
              onChange: (e) => {
                params.set("search", e);
                setPage(1);
              },
            })}
          />
          <div className="flex w-full gap-3">
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
        </div>
        <div className="rounded-md border">
          <Table className="hidden md:table">
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
                    <TableCell>
                      <Text>{index}</Text>
                    </TableCell>
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
                    <TableCell>
                      <Text>{launch.name}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>
                        {dayjs(launch.date_local).format("DD/MM/YYYY")}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text>{launch.rocket.name}</Text>
                    </TableCell>
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
                          <Youtube className="text-red-500" />
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
          <div className="flex flex-col gap-3 md:hidden">
            {isLoading ? (
              <Card className="p-6">
                <div className="flex justify-center">
                  <Loading />
                </div>
              </Card>
            ) : data?.results.length === 0 ? (
              <div className="flex flex-col items-center justify-center">
                <Lottie
                  className="w-[220px]"
                  animationData={empty}
                  loop={true}
                />
                <Text className="text-slate text-center">
                  Nenhum Lançamento encontrado...
                </Text>
              </div>
            ) : (
              data?.results.map((launch, index) => (
                <Card key={index}>
                  <div className="flex gap-3 p-3">
                    <div className="flex">
                      <Text>{index}</Text>
                    </div>
                    <div className="flex flex-1 items-start justify-center">
                      <Text className="text-center">{launch.name}</Text>
                    </div>
                    <div className="flex items-start justify-center">
                      {launch.links.patch.small ? (
                        <Image
                          src={launch.links.patch.small}
                          alt="logo mission"
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-[15px]"
                        />
                      ) : (
                        <Text>
                          <RocketIcon className="w-[15px]" />
                        </Text>
                      )}
                    </div>
                  </div>
                  <Separator />
                  <CardContent>
                    <div className="flex flex-col gap-2 py-2">
                      <div className="flex justify-between">
                        <Text className="text-xs">Foguete:</Text>
                        <Text className="text-xs">{launch.rocket.name}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text className="text-xs">Data:</Text>
                        <Text className="text-xs">
                          {dayjs(launch.date_utc).format("DD/MM/YYYY")}
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text className="text-xs">Sucesso:</Text>
                        <Text
                          className={`text-xs ${
                            launch.success ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {launch.success ? "sucesso" : "Falha"}
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text className="text-xs">Vídeo:</Text>
                        {launch.links.webcast ? (
                          <Link target="_blank" href={launch.links.webcast}>
                            <Youtube className="text-red-500" />
                          </Link>
                        ) : (
                          <VideoOff />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="scrollbar-hide flex  flex-1 gap-2 overflow-x-scroll">
            {listPages?.map((pg, index) => (
              <Button
                key={index}
                size={"sm"}
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
          <div className="flex space-x-2 ">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => {
                setPage((prev) => (prev === 1 ? 0 : prev - 1));
              }}
              disabled={!data?.hasPrev}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => {
                setPage((prev) =>
                  prev < Number(data?.totalPages)
                    ? prev + 1
                    : Number(data?.totalPages),
                );
              }}
              disabled={!data?.hasNext}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
