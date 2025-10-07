import type { ReactNode } from "react";

export interface TableContextType {
  columns: string,
}
export interface TableType{
  children: ReactNode,
  columns: string,
}