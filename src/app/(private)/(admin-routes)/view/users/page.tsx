'use client';

import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { TbLoaderQuarter } from 'react-icons/tb';
import type { InferType } from 'yup';

import { useCreateQuery, useUsers } from '@/hooks';
import type { userSchema } from '@/yup/user-schema';

type UserSchemaInferType = InferType<typeof userSchema>;

export default function UserClientPage() {
  const navigate = useRouter();
  const { listUsers } = useUsers();

  const { data, isLoading } = useCreateQuery<UserSchemaInferType[]>({
    queryKey: ['users'],
    queryFn: listUsers,
  });

  const isEmptyUsers = data?.length === 0 && !isLoading;

  if (isLoading) {
    return (
      <Box className="flex h-[400px] items-center justify-center">
        <TbLoaderQuarter size={30} className="animate-spin" />
      </Box>
    );
  }
  if (isEmptyUsers) {
    return (
      <Box className="flex h-[400px] flex-col items-center justify-center gap-[8px]">
        <Typography variant="h2" className="!text-[30px]">
          Nenhum usuário foi cadastrado!
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" className="pb-[10%]">
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Usuários
      </Typography>

      <Grid container spacing={2}>
        {!isEmptyUsers &&
          data &&
          data.map((user) => (
            <Grid size={{ xs: 12 }} key={user.id}>
              <Card>
                <CardActionArea onClick={() => navigate.push(`/edit/user/${user.id}`)}>
                  <CardContent className="flex flex-col">
                    <Typography variant="h5" color="primary">
                      {user.name}
                    </Typography>
                    <Typography variant="h5" className="text-nowrap">
                      {user.city}
                    </Typography>
                    <Typography variant="h5" className="text-nowrap uppercase" color="primary">
                      {user.loginType}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
