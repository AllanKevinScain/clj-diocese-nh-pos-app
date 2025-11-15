import type { PoslllSchemaInferType } from '@/yup';

export function filterPoslll(data: PoslllSchemaInferType[], type: 'older' | 'younger') {
  const filterData = data.filter((item) => {
    if (type === 'older') return item.isCouple;
    return !item.isCouple;
  });

  const finalyData = filterData.map((item) => ({
    label: item.candidateName,
    value: item.id ?? '',
  }));

  return finalyData;
}
