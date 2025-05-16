"use client";

import { Box, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TbLoaderQuarter } from "react-icons/tb";
import { InferType } from "yup";

import { useListRecords } from "@/hooks";
import { poslSchema } from "@/yup";

import { ControlButtons, ListRecords, Newrecord } from "./components";

export type InfertypePoslSchema = InferType<typeof poslSchema>;

interface CourseClientPageInterface {
  courseNumber: string;
  courseId: string;
}

export const CourseClientPage = (props: CourseClientPageInterface) => {
  const { courseNumber, courseId } = props;
  const { listRecordsByCourseNumber } = useListRecords();

  const { data, isLoading } = useQuery<InfertypePoslSchema[]>({
    queryKey: ["fichas", courseNumber],
    queryFn: () => listRecordsByCourseNumber(courseNumber),
  });

  const isEmptyRecords = data && data?.length === 0 && !isLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <TbLoaderQuarter size={30} className="animate-spin" />
      </div>
    );
  }
  if (isEmptyRecords) {
    return (
      <Box className="flex flex-col justify-center items-center gap-[8px] h-[400px]">
        <Typography variant="h2" className="!text-[30px]">
          Nenhum curso foi cadastrado!
        </Typography>
        <Newrecord />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" className="flex flex-col gap-[32px]">
      <ControlButtons courseId={courseId} />
      <ListRecords records={data!} />
    </Container>
  );
};
