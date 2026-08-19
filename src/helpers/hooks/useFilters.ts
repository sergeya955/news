import { useState } from "react";

export type Filters = {
  page_number: number;
  page_size: number;
  category: string;
  keywords: string;
};

export type FilterKey = keyof Filters;
export type ChangeFilters<T extends Filters> = <K extends keyof T>(key: K, value: T[K]) => void;

export const useFilters = <T extends Filters>(initialFilters: T) => {
  const [filters, setFilters] = useState<T>(initialFilters);

  const changeFilters: ChangeFilters<T> = (key, value) => {
    setFilters((prev) => {
      return { ...prev, [key]: value };
    });
  };

  return { filters, changeFilters };
};
