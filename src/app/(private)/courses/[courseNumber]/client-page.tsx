"use client";

import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { useListRecords } from "@/hooks";

import { ControlButtons, ListRecords } from "./components";

interface CourseClientPageInterface {
  courseNumber: string;
  courseId: string;
}

export const CourseClientPage = (props: CourseClientPageInterface) => {
  const { courseNumber, courseId } = props;
  const { listRecordsByCourseNumber } = useListRecords();

  const {} = useQuery({
    queryKey: ["fixas", courseNumber],
    queryFn: () => listRecordsByCourseNumber(courseNumber),
  });

  return (
    <Container maxWidth="xl" className="flex flex-col gap-[8px]">
      <ControlButtons courseId={courseId} />
      <ListRecords />
    </Container>
  );
};
