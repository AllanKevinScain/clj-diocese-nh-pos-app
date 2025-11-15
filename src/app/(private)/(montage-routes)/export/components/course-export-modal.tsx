'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button, DefaultDialog, FieldDefault, Heading } from '@/components';
import { formatMobilePhone } from '@/helpers';
import { useListRecords } from '@/hooks';
import type { FilterRecordsType } from '@/types';
import type { ReportExportWithFilterInfertype } from '@/yup';
import { reportExportWithFilterSchema } from '@/yup';

interface CourseModalExportInterface {
  isOpen: boolean;
  handleModal: () => void;
}

export const CourseModalExport = (props: CourseModalExportInterface) => {
  const { isOpen, handleModal } = props;
  const { listAllRecords } = useListRecords();

  const [isBuildingArchive, setBuildingArchive] = useState(false);

  const { control, reset, handleSubmit } = useForm<ReportExportWithFilterInfertype>({
    resolver: yupResolver(reportExportWithFilterSchema),
    defaultValues: {
      courseNumber: undefined,
      candidateName: undefined,
      nickname: undefined,
      birthDate: undefined,
      candidatePhone: undefined,
      parishChapel: undefined,
      recordNumber: undefined,
      search: undefined,
      instagram: undefined,
      typeOfRecord: undefined,
    },
  });

  async function generateArchive(values: ReportExportWithFilterInfertype) {
    setBuildingArchive(true);
    try {
      const allRecordsResponse = await listAllRecords(values);

      if (allRecordsResponse?.data) {
        const records = allRecordsResponse as FilterRecordsType;
        const { data } = records;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Registros');

        worksheet.columns = [
          { header: 'Nome', key: 'candidateName', width: 25 },
          { header: 'Telefone', key: 'candidatePhone', width: 15 },
          { header: 'Apelido', key: 'nickname', width: 20 },
          { header: 'Instagram', key: 'instagram', width: 20 },
          { header: 'Data Nascimento', key: 'birthDate', width: 35 },
          { header: 'Paróquia/Capela', key: 'parishChapel', width: 35 },
        ];

        worksheet.getRow(1).eachCell((cell) => {
          cell.font = { bold: true };
        });

        data.forEach((item) => worksheet.addRow(item));

        workbook.xlsx.writeBuffer().then((buffer) => {
          const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          saveAs(blob, `curso-${values.courseNumber}.xlsx`);
        });

        handleModal();
      }
    } catch (error) {
      toast.error(JSON.stringify(error));
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
          <Button
            variant="outline"
            disabled={isBuildingArchive}
            onClick={() => {
              handleModal();
              reset();
            }}>
            Fechar
          </Button>
          <Button isLoading={isBuildingArchive} onClick={handleSubmit(generateArchive)}>
            Gerar arquivo
          </Button>
        </div>
      }>
      <Heading>Filtre por:</Heading>

      <div className="flex flex-col gap-2 p-[2px]">
        <FieldDefault
          id="courseNumber"
          control={control}
          label="Número de curso"
          type="number"
          maxLength={4}
        />
        <FieldDefault
          id="candidateName"
          control={control}
          label="Nome"
          onChange={(e) => e.replace(/[0-9]/g, '')}
          maxLength={50}
        />
        <FieldDefault
          id="candidatePhone"
          control={control}
          onChange={(e) => formatMobilePhone(e)}
          label="Telefone"
        />
        <FieldDefault id="nickname" control={control} label="Apelido" maxLength={50} />
        <FieldDefault id="instagram" control={control} label="Instagram" maxLength={30} />
        <FieldDefault id="birthDate" control={control} type="date" label="Data de Nascimento" />
        <FieldDefault
          id="recordNumber"
          control={control}
          label="Número de ficha"
          type="number"
          maxLength={2}
        />
        <FieldDefault
          id="parishChapel"
          control={control}
          label="Paróquia/Capela"
          onChange={(e) => e.replace(/[0-9]/g, '')}
          maxLength={50}
        />
      </div>
    </DefaultDialog>
  );
};
