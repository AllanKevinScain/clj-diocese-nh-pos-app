import type ExcelJS from 'exceljs';

import type { CommunityType } from '@/types';

import { addFieldVertical } from './add-field-vertical';

type GenerateCommunitiesPropsType = {
  workbook: ExcelJS.Worksheet;
  data: CommunityType<string>[];
};

export function generateCommunities(props: GenerateCommunitiesPropsType) {
  const { data, workbook } = props;
  if (data) {
    let row = 1;
    data.forEach((community) => {
      row = addFieldVertical({
        sheet: workbook,
        fieldName: `Comunidade ${community.number}`,
        value: community.members,
        startRow: row,
      });
    });
  }
}
