"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";
import { BiChevronLeft, BiPlus } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import { AcceptModal } from "@/components";
import { useCourses, useToggleModal } from "@/hooks";

interface ControlButtonsInterface {
  courseId: string;
}

export const ControlButtons = (props: ControlButtonsInterface) => {
  const { courseId } = props;
  const { data } = useSession();
  const navigate = useRouter();
  const { isOpen, handle } = useToggleModal();

  const { deleteCourse } = useCourses();

  async function deleteCourseById() {
    const response = await deleteCourse(courseId);

    if (!response?.ok) {
      toast.error(response.data.message);
    } else {
      toast.success(response.data.message);
      navigate.push("/courses");
    }
  }

  return (
    <>
      <AcceptModal isOpen={isOpen} handle={handle} accept={deleteCourseById} />

      <div
        className={twMerge(
          "flex flex-col items-center justify-between gap-[8px]",
          "md:flex-row"
        )}
      >
        {data?.user.loginType === "admin" && (
          <div
            className={twMerge(
              "flex flex-col items-center gap-[8px] w-full",
              "md:flex-row md:w-fit"
            )}
          >
            <Button
              variant="outlined"
              color="warning"
              className={twMerge("w-full", "md:w-fit")}
              startIcon={<BiChevronLeft />}
              onClick={() => navigate.push(`/edit/course/${courseId}`)}
            >
              Editar curso
            </Button>
            <Button
              variant="outlined"
              color="error"
              className={twMerge("w-full", "md:w-fit")}
              startIcon={<BiChevronLeft />}
              onClick={handle}
            >
              Escluir curso
            </Button>
          </div>
        )}
        <div
          className={twMerge(
            "flex flex-col items-center gap-[8px] w-full",
            "md:flex-row md:w-fit"
          )}
        >
          <Button
            variant="outlined"
            className={twMerge("w-full", "md:w-fit")}
            startIcon={<BiChevronLeft />}
            onClick={() => navigate.back()}
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            className={twMerge("w-full", "md:w-fit")}
            startIcon={<BiPlus />}
            onClick={() => navigate.push(`/public/courses/${1}/create-pos-l`)}
          >
            Criar ficha nova
          </Button>
        </div>
      </div>
    </>
  );
};
