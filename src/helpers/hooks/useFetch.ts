import { useEffect, useState } from "react";

type FetchParams = Record<string, string | number | null | undefined>;

export const useFetch = <TData>(
  fetchFunction: (params?: FetchParams) => Promise<TData>,
  params?: FetchParams,
  initialData?: TData,
) => {
  const [data, setData] = useState<TData | undefined>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  const stringParams = params
    ? new URLSearchParams(
        Object.entries(params).reduce<Record<string, string>>(
          (acc, [key, value]) => {
            if (value !== null && value !== undefined && value !== "") {
              acc[key] = String(value);
            }
            return acc;
          },
          {},
        ),
      ).toString()
    : "";

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchFunction(params);

        if (isMounted) {
          setData(result);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [fetchFunction, stringParams]);

  return { data, isLoading, error };
};
