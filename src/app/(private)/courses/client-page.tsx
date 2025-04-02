"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export const Courses: React.FC = () => {
  const navigate = useRouter();

  return (
    <Container maxWidth="lg">
      <Stack flexDirection="column" spacing={8}>
        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
          Cursos Atuais
        </Typography>
        <Grid container spacing={2}>
          {[{ id: "123", title: "Teste" }].map((course) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
              <Card>
                <CardActionArea
                  onClick={() => navigate.push(`/public/courses/${course.id}`)}
                >
                  <CardContent>
                    <Typography variant="h5">{course.title}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
          Cursos Anteriores
        </Typography>
        <Grid container spacing={2}>
          {[{ id: "123", title: "Teste" }].map((course) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
              <Card>
                <CardActionArea
                  onClick={() => navigate.push(`/public/courses/${course.id}`)}
                >
                  <CardContent>
                    <Typography variant="h5">{course.title}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};
