import { FilterParams, listLaunches } from "@/service/resources/launches";
import { useQuery } from "@tanstack/react-query";

export const useListLaunches = (filter?: FilterParams) =>
  useQuery({
    queryKey: [
      "list-launches",
      String(filter?.page),
      String(filter?.limit),
      String(filter?.search),
    ],
    queryFn: () => listLaunches(filter),
    retry: false,
    refetchOnMount: true,
  });
