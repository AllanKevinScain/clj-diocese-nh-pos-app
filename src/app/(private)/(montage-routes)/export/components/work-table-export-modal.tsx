'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
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

  const { control, reset, handleSubmit } = useForm<ReportExportWithFilterSchemaSchemaInfertype>({
    resolver: yupResolver(exportWorkTableSchema),
    defaultValues: {
      courseNumber: null,
    },
  });

  async function generateArchive(values: ReportExportWithFilterSchemaSchemaInfertype) {
    if (values.courseNumber) {
      const recordsByCourse = await listRecordsByCourseNumber(values.courseNumber);
      const workTableResponse = await getWorkTableByCourseNumber(values);

      if (workTableResponse?.data) {
        const workTable = workTableResponse as WorkTableWithRecords;
        await generateCourseMontagem({ workTable, candidates: recordsByCourse });

        handleModal();
      }
    }
  }

  return (
    <DefaultDialog
      isOpen={isOpen}
      handleModal={handleModal}
      title="Exportar informações em geral"
      actionsButtons={
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              handleModal();
              reset();
            }}>
            Fechar
          </Button>
          <Button onClick={handleSubmit(generateArchive)}>Gerar arquivo</Button>
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
