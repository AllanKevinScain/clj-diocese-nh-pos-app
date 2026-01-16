export type RecordType = 'POSl' | 'POSll' | 'POSlll';
export type LoginType = 'admin' | 'manager' | 'builder-manager';
export type SelectInputOptionType = { label: string; value: string };
export type RouteType = 'poslll' | 'parish-chapel';
export type FunctionType = 'WORK' | 'COUPLE';

export type ReturnHandlerApiType<T> = {
  ok?: boolean;
  message: string;
  data: T | null;
};
