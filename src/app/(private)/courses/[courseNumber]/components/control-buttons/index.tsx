"use client";

import { Button, ButtonOwnProps, Grid } from "@mui/material";
import { isEmpty } from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { HiArrowUturnLeft } from "react-icons/hi2";

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

  const isAdmin = data?.user.loginType === "admin";

  const actionForAdmin = [
    {
      label: "Editar curso",
      icon: <BiEdit />,
      url: `/edit/course/${courseId}`,
      color: "warning",
      click: () => null,
    },
    {
      label: "Excluir curso",
      icon: <BiTrash />,
      url: "",
      color: "error",
      click: () => handle(),
    },
  ];

  const actionButtons = [
    ...(isAdmin ? actionForAdmin : []),
    {
      label: "Voltar",
      icon: <HiArrowUturnLeft />,
      url: "",
      color: "primary",
      click: () => navigate.back(),
    },
    {
      label: "Criar ficha nova",
      icon: <BiPlus />,
      url: "/record/pos-l/register",
      color: "primary",
      click: () => null,
    },
  ];

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

      <Grid container spacing={2}>
        {actionButtons.map((actionButton) => (
          <Grid
            key={actionButton.label}
            size={{ xs: 6, md: 6, sm: 6, lg: 6 }}
            className="h-[100px]"
          >
            {!isEmpty(actionButton.url) && (
              <Link href={actionButton.url}>
                <Button
                  color={actionButton.color as ButtonOwnProps["color"]}
                  variant="contained"
                  className="flex items-center justify-center rounded-[12px] w-full h-full"
                  endIcon={actionButton.icon}
                >
                  {actionButton.label}
                </Button>
              </Link>
            )}

            {isEmpty(actionButton.url) && (
              <Button
                color={actionButton.color as ButtonOwnProps["color"]}
                variant="contained"
                onClick={actionButton.click}
                className="flex items-center justify-center rounded-[12px] w-full h-full"
                endIcon={actionButton.icon}
              >
                {actionButton.label}
              </Button>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
};
