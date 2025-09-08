import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import type { RecordFilterType, WorkTableWithRecords } from '@/types';

import { generateCandidates } from './candidates';
import { generateCommunities } from './communities';
import { generateKitchen } from './kitchen';
import { generateWorkTablePeaples } from './work-table-peaples';

type GenerateMontagePropsType = {
  workTable: WorkTableWithRecords;
  candidates: RecordFilterType[];
};

export async function generateCourseMontagem(props: GenerateMontagePropsType) {
  const { workTable, candidates } = props;
  const workbook = new ExcelJS.Workbook();

  const candidatesSheet = workbook.addWorksheet('Cursistas');
  candidatesSheet.columns = [{ width: 50 }];
  generateCandidates({ workbook: candidatesSheet, data: candidates });

  const montageSheet = workbook.addWorksheet('Equipe de sala');
  montageSheet.columns = [{ width: 50 }];
  generateWorkTablePeaples({ workbook: montageSheet, data: workTable.data });

  const kitchenSheet = workbook.addWorksheet('Equipe da Cozinha');
  kitchenSheet.columns = [{ width: 50 }];
  generateKitchen({ workbook: kitchenSheet, data: workTable.data });

  const communitiesSheet = workbook.addWorksheet('Comunidades');
  communitiesSheet.columns = [{ width: 50 }];
  generateCommunities({ workbook: communitiesSheet, data: workTable.data.communities });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(blob, 'curso-estrutura.xlsx');
}
