import { Text } from "@/components/Text";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Launch } from "@/service/resources/launches";
import dayjs from "dayjs";
import { RocketIcon, VideoOff, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const ListCardLaunches = ({
  id,
  launch,
}: {
  id: number;
  launch: Launch;
}) => {
  return (
    <Card>
      <div className="flex gap-3 p-3">
        <div className="flex">
          <Text>{id}</Text>
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
  );
};
