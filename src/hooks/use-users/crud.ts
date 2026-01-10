import type {
  RegisterUserSchemaInferType,
  UserPasswordSchemaInferType,
  UserSchemaInferType,
} from '@/yup';

export async function registerUser(props: RegisterUserSchemaInferType) {
  const req = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify(props),
  });
  const res = await req.json();
  return res;
}

export async function updateUser(props: UserSchemaInferType) {
  const { id, ...rest } = props;
  const req = await fetch(`/api/user?userId=${id}`, {
    method: 'PUT',
    body: JSON.stringify(rest),
  });
  const res = await req.json();
  return res;
}

export async function changeStatusUser(userId: string) {
  const req = await fetch(`/api/user?userId=${userId}`, {
    method: 'PATCH',
  });
  const res = await req.json();
  return res;
}

export async function updateUserPassword(props: UserPasswordSchemaInferType) {
  const { id, ...rest } = props;
  const req = await fetch(`/api/user/password?userId=${id}`, {
    method: 'PUT',
    body: JSON.stringify(rest),
  });
  const res = await req.json();
  return res;
}
