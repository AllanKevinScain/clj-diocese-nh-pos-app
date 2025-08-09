import type { LoginType } from './generic-types.type';

export interface UserResponseInterface {
  id: string;
  email: string;
  password: string;
  loginType: LoginType;
  name: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}
