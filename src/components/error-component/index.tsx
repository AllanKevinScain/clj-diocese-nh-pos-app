"use client";

import { Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export interface ErrorComponentInterface {
  error: Error & { digest?: string };
  reset: () => void;
}

export const ErrorComponent: React.FC<ErrorComponentInterface> = (props) => {
  const { error, reset } = props;
  const { message = "Ocorreu algo imprevisto!" } = error;
  const session = useSession();
  const route = useRouter();

  const handleLogout = async () => {
    if (session.status === "authenticated") {
      const response = await signOut({ redirect: false });

      if (response.url !== undefined) {
        route.push("/");
      }
    } else {
      route.refresh();
      route.push("/");
    }
  };

  return (
    <Container>
      <div className="flex flex-col items-center justify-center w-[50%] h-screen mx-auto gap-10">
        <div className="flex flex-col justify-center items-center">
          <h2 className="whitespace-nowrap font-semibold mb-2 max-w-[300px]">
            {message}
          </h2>
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-ternary-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-ternary-700 before:dark:opacity-1 after:dark:from-ternary-900 after:dark:via-ternary-500 before:lg:h-[360px]">
            <img
              className="relative border-b-[2px] border-white"
              src="/error.png"
              alt="Next.js Logo"
            />
          </div>
        </div>

        <Button
          className="relative text-fontsColor-200 p-4"
          type="button"
          onClick={() => {
            handleLogout();
            reset();
          }}
        >
          Recarregar
        </Button>
      </div>
    </Container>
  );
};
