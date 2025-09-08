'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useForm } from 'react-hook-form';
import type * as yup from 'yup';

import { Button, DefaultDialog, FieldDefault, Heading } from '@/components';
import { formatMobilePhone } from '@/helpers';
import { useListRecords } from '@/hooks';
import type { FilterRecordsType } from '@/types';
import { reportExportWithFilterSchema } from '@/yup';

type ReportExportWithFilterSchemaSchemaInfertype = yup.InferType<
  typeof reportExportWithFilterSchema
>;

interface CourseModalExportInterface {
  isOpen: boolean;
  handleModal: () => void;
}

export const CourseModalExport = (props: CourseModalExportInterface) => {
  const { isOpen, handleModal } = props;
  const { listAllRecords } = useListRecords();

  const { control, reset, handleSubmit } = useForm<ReportExportWithFilterSchemaSchemaInfertype>({
    resolver: yupResolver(reportExportWithFilterSchema),
    defaultValues: {
      courseNumber: null,
      parishAcronym: null,
      candidateName: null,
      nickname: null,
      birthDate: null,
      candidatePhone: null,
      instagram: null,
      priest: null,
      parishChapel: null,
      recordNumber: null,
      search: null,
    },
  });

  async function generateArchive(values: ReportExportWithFilterSchemaSchemaInfertype) {
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
        { header: 'Sigla Grupo', key: 'parishAcronym', width: 12 },
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
          id="parishAcronym"
          control={control}
          label="Sigla do grupo"
          onChange={(e) => e.replace(/[0-9]/g, '')}
          maxLength={10}
        />
        <FieldDefault
          id="parishChapel"
          control={control}
          label="Paróquia/Capela"
          onChange={(e) => e.replace(/[0-9]/g, '')}
          maxLength={50}
        />
        <FieldDefault
          id="priest"
          control={control}
          label="Pároco"
          onChange={(e) => e.replace(/[0-9]/g, '')}
          maxLength={50}
        />
      </div>
    </DefaultDialog>
  );
};
