"use client";

import {
  Box,
  Container,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { BiSolidChurch } from "react-icons/bi";

import { NavBar } from "@/components";

export default function Root() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <main>
      <NavBar />

      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            padding: isMobile ? 2 : 4,
            my: 4,
            backgroundColor: theme.palette.grey[50],
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={4}
            color="primary.main"
          >
            <BiSolidChurch size={100} />
          </Box>

          <Box
            component="img"
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
            alt="Juventude em comunhão"
            sx={{
              width: "100%",
              borderRadius: 2,
              maxHeight: 300,
              objectFit: "cover",
              mb: 3,
            }}
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
            color="secondary"
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
          </Box>
        </Paper>
      </Container>
    </main>
  );
}
