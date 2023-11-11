import dayjs from "dayjs";
import Lottie from "lottie-react";
import { VideoOff, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Text } from "@/components/Text";
import { Loading } from "@/components/ui/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LaunchListResource } from "@/service/resources/launches";

import empty from "@public/no-launches.json";

const headerTableItems = [
  "Id",
  "Logo",
  "Missão",
  "Data de Lançamento",
  "Foguete",
  "Resultado",
  "Vídeo",
];

export const ListTableLaunches = ({
  isLoading,
  resource,
  calculeIdPerPage,
}: {
  isLoading: boolean;
  calculeIdPerPage: (index: number) => number;
  resource?: LaunchListResource;
}) => {
  return (
    <Table className="hidden md:table">
      <TableHeader>
        <TableRow>
          {headerTableItems.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
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
        ) : resource?.results.length ? (
          resource.results.map((launch, index) => (
            <TableRow key={launch.id}>
              <TableCell>
                <Text>{calculeIdPerPage(index)}</Text>
              </TableCell>
              <TableCell>
                <Image
                  src={launch.links.patch.small || "/mission-logo-default.png"}
                  alt="Mission's logo"
                  width={30}
                  height={30}
                />
              </TableCell>
              <TableCell>
                <Text>{launch.name}</Text>
              </TableCell>
              <TableCell>
                <Text>{dayjs(launch.date_local).format("DD/MM/YYYY")}</Text>
              </TableCell>
              <TableCell>
                <Text>{launch.rocket.name}</Text>
              </TableCell>
              <TableCell>
                <Text
                  className={launch.success ? "text-green-500" : "text-red-500"}
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
  );
};
