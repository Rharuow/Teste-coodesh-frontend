import { api } from "../api";

export type FilterParams = {
  search?: string;
  limit?: number;
  page?: number;
};

export const listLaunches = async (filter?: FilterParams) => {
  const launches = await api.get("/launches", {
    params: filter ?? {},
  });

  return launches;
};
