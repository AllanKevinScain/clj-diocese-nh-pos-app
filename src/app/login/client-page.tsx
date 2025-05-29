'use client';

import { Button } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri';
import type { InferType } from 'yup';

import { loginSchema } from '@/yup';

type LoginSchemaInferType = InferType<typeof loginSchema>;

export const ClientPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaInferType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: 'teste@gmail.com',
      password: 'teste123!',
    },
  });
  const navigate = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  async function onSubmit(values: LoginSchemaInferType) {
    const { email, password } = values;
    const res = await signIn('credentials', {
      email: email.toLowerCase().trim(),
      password: password.trim(),
      redirect: false,
    });

    if (!res?.ok) {
      toast.error('Usuário não cadastrado!');
    } else {
      toast.success('Login efetuado com sucesso!');
      navigate.push('/courses');
    }
  }

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
      <img
        src="https://cljdiocesenh.com.br/wp-content/uploads/2020/03/logo-Curso-de-Lideran%C3%A7a.png"
        alt="Logo"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <Typography
        component="h1"
        fontWeight="700"
        color="primary"
        fontSize={{ xs: '38px', sm: '42px', md: '46px', lg: '50px' }}>
        Login
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              label="Digite seu e-mail"
              autoComplete="@gmail.com"
              autoFocus
              onChange={(e) => field.onChange(e.target.value.toLowerCase())}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              required
              fullWidth
              label="Digite sua senha"
              autoComplete="@gmail.com"
              autoFocus
              error={!!errors.password}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}>
                        {showPassword ? <RiEyeFill /> : <RiEyeCloseFill />}
                      </Button>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />

        <Button type="submit" className="w-full">
          Entrar
        </Button>
        <Link href="#" variant="body2">
          Quero acesso
        </Link>
      </Box>
    </Container>
  );
};
