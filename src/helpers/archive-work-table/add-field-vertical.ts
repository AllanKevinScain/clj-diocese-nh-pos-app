import type { Worksheet } from 'exceljs';

type AddFieldVerticalType = {
  sheet: Worksheet;
  fieldName: string;
  value: string | string[];
  startRow: number;
};
export function addFieldVertical(props: AddFieldVerticalType) {
  const { fieldName, sheet, startRow, value } = props;
  let currentRow = startRow;

  if (currentRow > 1) currentRow++;

  const titleRow = sheet.getRow(currentRow);
  titleRow.getCell(1).value = fieldName;
  titleRow.getCell(1).font = { bold: true };
  currentRow++;

  if (Array.isArray(value)) {
    value.forEach((item) => {
      sheet.getRow(currentRow).getCell(1).value = item;
      currentRow++;
    });
  } else {
    sheet.getRow(currentRow).getCell(1).value = value;
    currentRow++;
  }

  return currentRow;
}
