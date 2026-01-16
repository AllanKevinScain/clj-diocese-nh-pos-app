'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type * as yup from 'yup';

import { Button, DefaultDialog, Heading, SelectDefault } from '@/components';
import { generateCourseMontage } from '@/helpers';
import { useCourses, useRecords, useWorkTable } from '@/hooks';
import type { WorkTableWithRecords } from '@/types';
import type { CourseInferType } from '@/yup';
import { exportWorkTableSchema } from '@/yup';

type ReportExportWithFilterSchemaSchemaInfertype = yup.InferType<typeof exportWorkTableSchema>;

interface WorkTableModalExportInterface {
  isOpen: boolean;
  handleModal: () => void;
}

export const WorkTableModalExport = (props: WorkTableModalExportInterface) => {
  const { isOpen, handleModal } = props;
  const { listRecordByCourseId } = useRecords();
  const { getWorkTableByCourseId } = useWorkTable();
  const { listCourses } = useCourses();

  const [isBuildingArchive, setBuildingArchive] = useState(false);

  const { control, reset, handleSubmit } = useForm<ReportExportWithFilterSchemaSchemaInfertype>({
    resolver: yupResolver(exportWorkTableSchema),
    defaultValues: {
      id: undefined,
    },
  });

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: listCourses,
    select: (response) => {
      const auxesponse = response as CourseInferType[];

      const allowedCourses = auxesponse.filter((course) => {
        const endDate = new Date(course.endDate);
        const now = new Date();
        const disabled = now > endDate;
        return !disabled;
      });

      return (
        allowedCourses.map((course) => ({
          value: course.id || '',
          label: `Curso Nº ${course.courseNumber} - ${course.typeOfCourse}`,
        })) || []
      );
    },
  });

  function closeModal() {
    handleModal();
    reset();
  }

  async function generateArchive(values: ReportExportWithFilterSchemaSchemaInfertype) {
    setBuildingArchive(true);
    try {
      if (values.id) {
        const recordsByCourse = await listRecordByCourseId(values.id);
        const workTableResponse = await getWorkTableByCourseId(values);

        if (workTableResponse.ok) {
          if (workTableResponse?.data) {
            const workTable = workTableResponse as WorkTableWithRecords;
            await generateCourseMontage({ workTable, candidates: recordsByCourse });
            toast.success('Download concluido');
          }
        } else {
          toast.error(workTableResponse.data.message);
        }
        closeModal();
      }
    } finally {
      setBuildingArchive(false);
    }
  }

  return (
    <DefaultDialog
      isOpen={isOpen}
      handleModal={handleModal}
      title="Exportar informações em geral"
      size="full"
      actionsButtons={
        <div className="flex items-center justify-between">
          <Button variant="outline" disabled={isBuildingArchive} onClick={closeModal}>
            Fechar
          </Button>
          <Button isLoading={isBuildingArchive} onClick={handleSubmit(generateArchive)}>
            Gerar arquivo
          </Button>
        </div>
      }>
      <Heading>Escolha o curso:</Heading>

      <div className="p-[2px] pb-[50px]">
        <SelectDefault control={control} id="id" options={courses || []} />
      </div>
    </DefaultDialog>
  );
};
