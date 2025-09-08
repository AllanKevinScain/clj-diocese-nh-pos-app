import type ExcelJS from 'exceljs';

import type { WorkTableRecordsResponseInterface } from '@/types';

import { addFieldVertical } from './add-field-vertical';

type WorkTablePeaplesPropsType = {
  workbook: ExcelJS.Worksheet;
  data: WorkTableRecordsResponseInterface;
};

export function generateWorkTablePeaples(props: WorkTablePeaplesPropsType) {
  const { workbook, data } = props;

  // Preencher Montagem do curso
  let currentRow = 1;

  currentRow = addFieldVertical({
    sheet: workbook,
    fieldName: 'Coordenador',
    value: data.coordinator,
    startRow: currentRow,
  });
  currentRow = addFieldVertical({
    sheet: workbook,
    fieldName: 'Base',
    value: data.base,
    startRow: currentRow,
  });
  currentRow = addFieldVertical({
    sheet: workbook,
    fieldName: 'Auxiliar',
    value: data.auxiliar,
    startRow: currentRow,
  });
  currentRow = addFieldVertical({
    sheet: workbook,
    fieldName: 'Cozinha Espiritual',
    value: data.kitchenSpiritual,
    startRow: currentRow,
  });
  currentRow = addFieldVertical({
    sheet: workbook,
    fieldName: 'Liturgia',
    value: data.liturgy,
    startRow: currentRow,
  });
  currentRow = addFieldVertical({
    sheet: workbook,
    fieldName: 'Secretário',
    value: data.secretary,
    startRow: currentRow,
  });
  currentRow = addFieldVertical({
    sheet: workbook,
    fieldName: 'Casal a Ser',
    value: data.coupleSafeToBe,
    startRow: currentRow,
  });
  currentRow = addFieldVertical({
    sheet: workbook,
    fieldName: 'Casal Coord. Cozinha',
    value: data.coupleKitchenCoordinator,
    startRow: currentRow,
  });
  currentRow = addFieldVertical({
    sheet: workbook,
    fieldName: 'Aux. Liturgia',
    value: data.auxiliarLiturgy,
    startRow: currentRow,
  });
  currentRow = addFieldVertical({
    sheet: workbook,
    fieldName: 'Aux. Secretário',
    value: data.auxiliarSecretary,
    startRow: currentRow,
  });
  currentRow = addFieldVertical({
    sheet: workbook,
    fieldName: 'Coord. Folclore',
    value: data.folkloreCoordinator,
    startRow: currentRow,
  });
  currentRow = addFieldVertical({
    sheet: workbook,
    fieldName: 'Bar',
    value: data.bar,
    startRow: currentRow,
  });
  console.log(currentRow);
}
