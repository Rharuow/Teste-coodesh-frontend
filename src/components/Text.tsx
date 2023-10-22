import React, { ReactNode } from "react";

export const Text = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p className={`font-bold text-slate-800 ${className || " "}`}>{children}</p>
  );
};
