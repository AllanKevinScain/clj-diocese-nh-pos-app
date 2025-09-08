import type ExcelJS from 'exceljs';

import type { WorkTableRecordsResponseInterface } from '@/types';

import { addFieldVertical } from './add-field-vertical';

type KitchenPropsType = {
  workbook: ExcelJS.Worksheet;
  data: WorkTableRecordsResponseInterface;
};

export function generateKitchen(props: KitchenPropsType) {
  const { workbook, data } = props;

  let currentRow = 1;

  currentRow = addFieldVertical({
    sheet: workbook,
    fieldName: 'Limpeza',
    value: data.cleanWorkRecords,
    startRow: currentRow,
  });
  currentRow = addFieldVertical({
    sheet: workbook,
    fieldName: 'Copa',
    value: data.copeWorkRecords,
    startRow: currentRow,
  });
  currentRow = addFieldVertical({
    sheet: workbook,
    fieldName: 'Cozinha',
    value: data.kitchenWorkRecords,
    startRow: currentRow,
  });
  console.log(currentRow);
}
