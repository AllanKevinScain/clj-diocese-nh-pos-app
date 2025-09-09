'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type * as yup from 'yup';

import { Button, DefaultDialog, Heading, SelectWithQuery } from '@/components';
import { generateCourseMontagem } from '@/helpers';
import type { CourseInferType } from '@/hooks';
import { useCourses, useListRecords, useWorkTable } from '@/hooks';
import type { WorkTableWithRecords } from '@/types';
import { exportWorkTableSchema } from '@/yup';

type ReportExportWithFilterSchemaSchemaInfertype = yup.InferType<typeof exportWorkTableSchema>;

interface WorkTableModalExportInterface {
  isOpen: boolean;
  handleModal: () => void;
}

export const WorkTableModalExport = (props: WorkTableModalExportInterface) => {
  const { isOpen, handleModal } = props;
  const { listRecordsByCourseNumber } = useListRecords();
  const { getWorkTableByCourseNumber } = useWorkTable();
  const { listCourses } = useCourses();

  const [isBuildingArchive, setBuildingArchive] = useState(false);

  const { control, reset, handleSubmit } = useForm<ReportExportWithFilterSchemaSchemaInfertype>({
    resolver: yupResolver(exportWorkTableSchema),
    defaultValues: {
      courseNumber: null,
    },
  });

  function closeModal() {
    handleModal();
    reset();
  }

  async function generateArchive(values: ReportExportWithFilterSchemaSchemaInfertype) {
    setBuildingArchive(true);
    try {
      if (values.courseNumber) {
        const recordsByCourse = await listRecordsByCourseNumber(values.courseNumber);
        const workTableResponse = await getWorkTableByCourseNumber(values);

        if (workTableResponse.ok) {
          if (workTableResponse?.data) {
            const workTable = workTableResponse as WorkTableWithRecords;
            await generateCourseMontagem({ workTable, candidates: recordsByCourse });
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
        <SelectWithQuery
          id="courseNumber"
          control={control}
          call={listCourses}
          modelData={(response) => {
            const auxesponse = response as CourseInferType[];
            return (
              auxesponse.map((course) => ({
                value: course.courseNumber,
                label: `Curso Nº ${course.courseNumber}`,
              })) || []
            );
          }}
        />
      </div>
    </DefaultDialog>
  );
};
