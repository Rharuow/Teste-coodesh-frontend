import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export const LimitSelect = ({
  limit,
  setLimit,
  setPage,
}: {
  limit: number;
  setLimit: (value: React.SetStateAction<number>) => void;
  setPage: (value: React.SetStateAction<number>) => void;
}) => {
  const RANGEOFMINANDMAXLIMIT = 10;
  const INTERVALBETWEENLIMIT = 5;
  const calculateEachIntervalOfLimitRange = (index: number) =>
    (index + 1) * INTERVALBETWEENLIMIT;
  return (
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
        {Array(RANGEOFMINANDMAXLIMIT)
          .fill(null)
          .map((_, index) => (
            <SelectItem
              key={index}
              value={String(calculateEachIntervalOfLimitRange(index))}
            >
              {calculateEachIntervalOfLimitRange(index)}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
