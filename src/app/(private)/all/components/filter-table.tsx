'use client';

import { Empty, Table } from '@/components';
import { formatMobilePhone } from '@/helpers';
import type { FilterRecordsType } from '@/types';

interface FilterTableInterface {
  list?: FilterRecordsType;
  clearFilters: () => void;
}

export const FilterTable = (props: FilterTableInterface) => {
  const { list, clearFilters } = props;

  if (!list?.ok) return;

  return (
    <Table.table>
      <thead>
        <Table.tr>
          <Table.th>Sigla do grupo</Table.th>
          <Table.th>Nome</Table.th>
          <Table.th>Apelido</Table.th>
          <Table.th>Data de Nascimento</Table.th>
          <Table.th>Telefone</Table.th>
          <Table.th>Instagram</Table.th>
          <Table.th>Pároco</Table.th>
          <Table.th>Paróquia/Capela</Table.th>
          <Table.th>Curso</Table.th>
          <Table.th>Ficha</Table.th>
        </Table.tr>
      </thead>
      <Table.tbody>
        {list?.data.map((record) => (
          <Table.tr key={record.id}>
            <Table.td>{record.parishAcronym}</Table.td>
            <Table.td>{record.candidateName}</Table.td>
            <Table.td>{record.nickname}</Table.td>
            <Table.td>{record.birthDate}</Table.td>
            <Table.td className="text-nowrap">{formatMobilePhone(record.candidatePhone)}</Table.td>
            <Table.td>{record.instagram}</Table.td>
            <Table.td>{record.priest}</Table.td>
            <Table.td>{record.parishChapel}</Table.td>
            <Table.td>{record.courseNumber}</Table.td>
            <Table.td>{record.recordNumber}</Table.td>
          </Table.tr>
        ))}

        {list.data.length === 0 && (
          <Table.tr>
            <Table.td colSpan={10}>
              <Empty title="Nenhum resultado encontrado" handleClick={clearFilters} />
            </Table.td>
          </Table.tr>
        )}
      </Table.tbody>
    </Table.table>
  );
};
