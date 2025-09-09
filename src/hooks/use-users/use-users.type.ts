import type { InferType } from 'yup';

import type { userSchema } from '@/yup/user-schema';

export type UserSchemaInferType = InferType<typeof userSchema>;

export interface ListUsersReturnInterface {
  data: UserSchemaInferType[];
  ok: boolean;
}
