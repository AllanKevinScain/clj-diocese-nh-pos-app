import type ExcelJS from 'exceljs';

import type { RecordFilterType } from '@/types';

type GenerateCandidatePropsType = {
  workbook: ExcelJS.Worksheet;
  data: RecordFilterType[];
};

export function generateCandidates(props: GenerateCandidatePropsType) {
  const { workbook, data } = props;
  let currentRow = workbook.lastRow?.number ? workbook.lastRow.number + 2 : 1;

  const titleRow = workbook.getRow(currentRow);
  titleRow.getCell(1).value = 'Todos os cursistas';
  titleRow.getCell(1).font = { bold: true };
  currentRow++;

  data.forEach((record) => {
    workbook.getRow(currentRow).getCell(1).value =
      `${record.candidateName} - ${record.parishChapel}`;
    currentRow++;
  });
}
