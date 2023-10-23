import { FilterParams, listLaunches } from "@/service/resources/launches";
import { useQuery } from "@tanstack/react-query";

export const useListLaunches = (filter?: FilterParams) =>
  useQuery({
    queryKey: ["list-launches"],
    queryFn: () => listLaunches(filter),
    retry: false,
  });
