"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { TbLoaderQuarter } from "react-icons/tb";
import { InferType } from "yup";

import { useCourses, useCreateQuery } from "@/hooks";
import { courseSchema } from "@/yup";

import { NewCourse } from "./components";

type CourseSchemaInferType = InferType<typeof courseSchema>;

export default function CoursesPage() {
  const navigate = useRouter();

  const { listCourses } = useCourses();

  const { data, isLoading } = useCreateQuery<CourseSchemaInferType[]>({
    queryKey: ["cursos"],
    queryFn: listCourses,
  });

  const isEmptyCourse = data && data?.length === 0 && !isLoading;

  const poslCourses = data?.filter((curso) => curso.typeOfCourse === "POSl");
  const posllCourses = data?.filter((curso) => curso.typeOfCourse === "POSll");

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-[400px]">
        <TbLoaderQuarter size={30} className="animate-spin" />
      </Box>
    );
  }
  if (isEmptyCourse) {
    return (
      <Box className="flex flex-col justify-center items-center gap-[8px] h-[400px]">
        <Typography variant="h2" className="!text-[30px]">
          Nenhum curso foi cadastrado!
        </Typography>
        <NewCourse />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" className="pb-[10%]">
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Cursos
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Pós 1
          </Typography>
        </Grid>
        {!isEmptyCourse &&
          poslCourses?.map((course) => (
            <Grid size={{ xs: 12 }} key={course.id}>
              <Card>
                <CardActionArea
                  onClick={() =>
                    navigate.push(
                      `/courses/${course.courseNumber}?courseId=${course.id}`
                    )
                  }
                >
                  <CardContent className="flex justify-between">
                    <Typography variant="h5">{course.courseNumber}</Typography>

                    <div className="flex gap-[8px]">
                      <Typography variant="h5" className="text-nowrap">
                        {dayjs(new Date(course.startDate)).format("DD/MM/YYYY")}
                      </Typography>
                      <span> - </span>
                      <Typography variant="h5" className="text-nowrap">
                        {dayjs(new Date(course.endDate)).format("DD/MM/YYYY")}
                      </Typography>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}

        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Pós 2
          </Typography>
        </Grid>

        {!isEmptyCourse &&
          posllCourses?.map((course) => (
            <Grid size={{ xs: 12 }} key={course.id}>
              <Card>
                <CardActionArea
                  onClick={() =>
                    navigate.push(
                      `/courses/${course.courseNumber}?courseId=${course.id}`
                    )
                  }
                >
                  <CardContent className="flex justify-between">
                    <Typography variant="h5">{course.courseNumber}</Typography>

                    <div className="flex gap-[8px]">
                      <Typography variant="h5" className="text-nowrap">
                        {dayjs(new Date(course.startDate)).format("DD/MM/YYYY")}
                      </Typography>
                      <span> - </span>
                      <Typography variant="h5" className="text-nowrap">
                        {dayjs(new Date(course.endDate)).format("DD/MM/YYYY")}
                      </Typography>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        <Grid size={{ xs: 12 }} textAlign="center">
          <NewCourse />
        </Grid>
      </Grid>
    </Container>
  );
}
