import type { QueryFunction, QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

type ResponseError = {
  data?: {
    message: string;
    error: string;
    status: number;
  };
};

type UseCreateQueryType<ReturnData = unknown> = {
  onError?: (_: ResponseError) => boolean | void;
  queryKey: QueryKey;
  queryFn: QueryFunction<ReturnData, QueryKey>;
  queryOptions?: Omit<
    UseQueryOptions<ReturnData, ResponseError, ReturnData, QueryKey>,
    'queryKey' | 'queryFn'
  >;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export function useCreateQuery<ReturnData = unknown>(options: UseCreateQueryType<ReturnData>) {
  const { onError, queryOptions, ...queryArgs } = options;

  const query = useQuery<ReturnData, ResponseError>({
    ...queryArgs,
    ...queryOptions,
  });

  const isArrayEmpty = Array.isArray(query.data) && query.data.length === 0;
  const hasErrorOrEmpty = query.isError || isArrayEmpty;

  const onResetQuery = useCallback(async () => {
    await queryClient.cancelQueries({ queryKey: queryArgs.queryKey });
    queryClient.removeQueries({ queryKey: queryArgs.queryKey });
  }, [queryArgs.queryKey]);

  const onRequestError = useCallback(() => {
    if (!query.isError) return;
    onError?.(query.error as ResponseError);
    onResetQuery();
  }, [onError, onResetQuery, query.error, query.isError]);

  useEffect(() => {
    onRequestError();
  }, [onRequestError]);

  return {
    ...query,
    hasErrorOrEmpty,
  };
}
