"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { InferType } from "yup";

import { FieldDefault, SelectDefault } from "@/components";
import { useCourses } from "@/hooks";
import { courseSchema } from "@/yup";

export type CourseInferType = InferType<typeof courseSchema>;

export default function RegisterCoursePage() {
  const navigate = useRouter();
  const { registerCourse } = useCourses();

  const { handleSubmit, control } = useForm<CourseInferType>({
    defaultValues: {
      startDate: "",
      endDate: "",
      typeOfCourse: "",
      courseNumber: 0,
    },
    resolver: yupResolver(courseSchema),
  });

  const onSubmit = async (data: CourseInferType) => {
    const res = await registerCourse(data);

    if (!res?.ok) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      navigate.push("/courses");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Formulário de Curso
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-[20px]"
      >
        <FieldDefault
          id="startDate"
          defaultValue=""
          control={control}
          type="date"
          customLabel={<Typography>Data de início</Typography>}
        />

        <FieldDefault
          control={control}
          defaultValue=""
          id="endDate"
          type="date"
          customLabel={<Typography>Data de término</Typography>}
        />

        <SelectDefault
          id="typeOfCourse"
          defaultValue=""
          control={control}
          label="Tipo do curso"
          options={[
            { value: "POSl", label: "Curso de Liderança - Pós 1" },
            { value: "POSll", label: "Curso de Liderança - Pós 2" },
          ]}
        />

        <FieldDefault
          id="courseNumber"
          defaultValue=""
          control={control}
          label="Número do curso"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Cadastrar
        </Button>
      </Box>
    </Container>
  );
}
