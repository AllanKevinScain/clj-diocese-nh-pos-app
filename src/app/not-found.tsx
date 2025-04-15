"use client";

import { Button, Container, Typography } from "@mui/material";

export default function notFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center w-[50%] h-screen mx-auto gap-10">
        <div className="flex flex-col justify-center items-center">
          <Typography
            variant="h1"
            className="font-semibold mb-2 !text-[26px]"
            color="primary"
          >
            Essa página não foi identificada!
          </Typography>
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-ternary-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-ternary-700 before:dark:opacity-1 after:dark:from-ternary-900 after:dark:via-ternary-500 before:lg:h-[360px]">
            <img
              className="relative border-b-[2px] border-white"
              src="/page_not_found.png"
              alt="Next.js Logo"
            />
          </div>
        </div>

        <Button
          className="relative text-fontsColor-200 p-4 animate-pulse"
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.assign("/login");
            }
          }}
        >
          Recarregar
        </Button>
      </div>
    </Container>
  );
}
