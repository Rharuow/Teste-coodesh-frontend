import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Text = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <p className={twMerge("font-bold ", className)}>{children}</p>;
};
