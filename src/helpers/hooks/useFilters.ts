import { useState } from "react";

export type Filters = {
  page_number: number;
  page_size: number;
  category: string;
  keywords: string;
};

export type FilterKey = keyof Filters;

export const useFilters = <T extends Filters>(initialFilters: T) => {
  const [filters, setFilters] = useState<T>(initialFilters);

  const changeFilters = <K extends keyof T>(key: K, value: T[K]) => {
    setFilters((prev) => {
      return { ...prev, [key]: value };
    });
  };

  return { filters, changeFilters };
};
