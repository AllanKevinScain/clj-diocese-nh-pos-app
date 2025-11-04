import type { SelectInputOptionType } from '@/types';
import type { UserSchemaInferType } from '@/yup/user-schema';

export interface ListUsersReturnInterface {
  data: UserSchemaInferType[];
  ok: boolean;
}

export interface ListParishesReturnInterface {
  data: SelectInputOptionType[];
  ok: boolean;
}
