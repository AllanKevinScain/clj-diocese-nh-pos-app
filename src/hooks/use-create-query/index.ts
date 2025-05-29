import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

type UseCreateQueryResult<T> = UseQueryResult<T> & {
  hasErrorOrEmpty: boolean;
};

export function useCreateQuery<
  TQueryFnData = unknown,
  TError extends Error = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[],
>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>): UseCreateQueryResult<TData> {
  const query = useQuery(options);

  const isArrayEmpty = Array.isArray(query.data) && query.data.length === 0;
  const hasErrorOrEmpty = query.isError || isArrayEmpty;

  return {
    ...query,
    hasErrorOrEmpty,
  };
}
