"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";

export const Newrecord = () => {
  return (
    <Link href="#">
      <Button endIcon={<BiPlus />} variant="contained">
        Cadastrar curso
      </Button>
    </Link>
  );
};
