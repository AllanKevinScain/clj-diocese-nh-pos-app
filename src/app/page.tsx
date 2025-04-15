"use client";

import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { BiSolidChurch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import { NavBar } from "@/components";

export default function Root() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <main>
      <NavBar showDrawer={false} showMenu={false} />

      <Container maxWidth="md">
        <Paper
          elevation={3}
          className={twMerge(
            `my-[16px] bg-[${theme.palette.grey[50]}]`,
            isMobile ? "p-[8px]" : "p-[16px]"
          )}
        >
          <Box
            className={`flex justify-center items-center mb-[16px]`}
            color="primary.main"
          >
            <BiSolidChurch size={100} />
          </Box>

          <Box
            component="img"
            src="https://www.rbsdirect.com.br/filestore/8/9/7/2/7/2/4_3ce20a02c96c2ea/4272798_276c5a4d8e99f08.jpg?version=1575255600"
            alt="Juventude em comunhão"
            className="w-full rounded-[8px] max-h-[300px] object-cover mb-[12px]"
          />

          <Typography
            variant={isMobile ? "h4" : "h3"}
            component="h1"
            color="primary"
            gutterBottom
          >
            Curso de Liderança Juvenil (CLJ)
          </Typography>

          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="h2"
            color="primary"
            gutterBottom
          >
            Diocese de Novo Hamburgo
          </Typography>

          <Typography variant="body1">
            O CLJ é um movimento eclesial formado por jovens e adultos, que
            busca evangelizar e formar comunidades vivas, atuando em suas
            paróquias, escolas e demais espaços sociais. Através de um método
            próprio, proporciona um ambiente de vivência cristã, oração, estudo
            e ação.
          </Typography>

          <Typography variant="body1">
            Sua base é estruturada no tripé{" "}
            <strong>Piedade, Estudo e Ação (EPA)</strong>, incentivando o
            crescimento pessoal e espiritual dos jovens, além de fortalecer sua
            vocação missionária.
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Assessor Eclesiástico:
            </Typography>
            <Typography variant="body1">Pe. José Francisco Júnior</Typography>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Contato:
            </Typography>
            <Typography variant="body1">
              Email: contato@cljdiocesenh.com.br
            </Typography>
            <Link href="/login" className="flex">
              <Button variant="contained" className="w-full">
                Ir para o login
              </Button>
            </Link>
          </Box>
        </Paper>
      </Container>
    </main>
  );
}
