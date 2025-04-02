"use client";

import { Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { BiChevronLeft, BiPlus } from "react-icons/bi";

import { ListRecords } from "./components";

export const CourseClientPage = () => {
  const navigate = useRouter();

  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
    >
      <Button
        variant="outlined"
        sx={{ width: "fit-content" }}
        startIcon={<BiChevronLeft />}
        onClick={() => navigate.back()}
      >
        Voltar
      </Button>
      <Button
        variant="contained"
        startIcon={<BiPlus />}
        onClick={() => navigate.push(`/public/courses/${1}/create-pos-l`)}
      >
        Criar nova ficha
      </Button>
      <ListRecords />
    </Container>
  );
};
