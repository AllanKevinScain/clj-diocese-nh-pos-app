"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { InferType } from "yup";

import { FieldDefault, SelectDefault } from "@/components";
import { useUsers } from "@/hooks";
import { registerUserSchema } from "@/yup/user-schema";

type RegisterUserSchemaInferType = InferType<typeof registerUserSchema>;

export default function RegisterUserClientPage() {
  const navigate = useRouter();

  const { registerUser } = useUsers();

  const { handleSubmit, control } = useForm<RegisterUserSchemaInferType>({
    resolver: yupResolver(registerUserSchema),
  });

  const onSubmit = async (data: RegisterUserSchemaInferType) => {
    const res = await registerUser(data);

    if (!res?.ok) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      navigate.push("/view/users");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom className="mt-[32px] text-center">
        Cadastrar usuário
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[20px]"
      >
        <FieldDefault
          id="name"
          defaultValue=""
          control={control}
          label="Paróquia/Capela"
        />

        <FieldDefault
          id="email"
          defaultValue=""
          control={control}
          label="Email"
        />

        <FieldDefault
          id="password"
          defaultValue=""
          control={control}
          label="Senha"
          type="password"
        />

        <SelectDefault
          id="loginType"
          defaultValue=""
          control={control}
          label="Tipo de usuário"
          options={[
            {
              value: "admin",
              label: "Administrador - Possui liberdade para qualquer ação",
            },
            { value: "manager", label: "Gerente - Pode cadastrar fixas" },
          ]}
        />

        <FieldDefault
          id="city"
          defaultValue=""
          control={control}
          label="Cidade"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="mt-[32px]"
        >
          Cadastrar
        </Button>
      </Box>
    </Container>
  );
}
