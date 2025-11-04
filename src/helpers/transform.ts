import type { PoslllSchemaInferType } from '@/yup';

export function filterPoslll(data: PoslllSchemaInferType[], type: 'older' | 'younger') {
  const filterData = data.filter((item) => {
    if (type === 'older') return item.candidateName.toLowerCase().includes('tios');
    return !item.candidateName.toLowerCase().includes('tios');
  });

  const finalyData = filterData.map((item) => ({
    label: item.candidateName,
    value: item.id ?? '',
  }));

  return finalyData;
}
