import { api } from "../api";

export type Launch = {
  links: {
    patch: {
      small: string;
      large: string;
    };
    reddit: {
      campaign: string;
      launch: string;
      media: string;
      recovery: string;
    };
    flickr: {
      small: Array<string>;
      original: Array<string>;
    };
    presskit: string;
    webcast: string;
    youtube_id: string;
    article: string;
    wikipedia: string;
  };
  static_fire_date_utc: string;
  static_fire_date_unix: number;
  tdb: boolean;
  net: boolean;
  window: number;
  rocket: { name: string; id: string };
  success: boolean;
  failures: [];
  details: string;
  crew: [{ crew: string; role: string }];
  ships: Array<string>;
  capsules: Array<string>;
  payloads: Array<string>;
  launchpad: string;
  auto_update: boolean;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: [
    {
      core: string;
      flight: number;
      gridfins: boolean;
      legs: boolean;
      reused: boolean;
      landing_attempt: boolean;
      landing_success: boolean;
      landing_type: string;
      landpad: string;
    },
  ];
  id: string;
};

export type FilterParams = {
  search?: string;
  results?: "fail" | "success";
  limit?: number;
  page?: number;
};

export const listLaunches = async (filter?: FilterParams) => {
  const launches = await api.get<{
    results: Array<Launch>;
    totalDocs: number;
    totalPages: number;
    page: number;
    hasNext: boolean;
    hasPrev: boolean;
  }>("/launches", {
    params: filter ?? {},
  });

  return launches.data;
};
