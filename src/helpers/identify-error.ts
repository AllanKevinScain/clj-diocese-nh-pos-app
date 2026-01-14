import type { ReturnHandlerApiType } from '@/types';

export function identifyStatusError(res: ReturnHandlerApiType<unknown>) {
  if (!res.ok) {
    throw new Error(res.message || 'Aconteceu algo, entre em contato com o a presidência!');
  }
}
