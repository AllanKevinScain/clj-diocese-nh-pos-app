'use client';

import { isEmpty } from 'lodash';
import type { Control } from 'react-hook-form';
import { Controller, useWatch } from 'react-hook-form';
import { BiPlus, BiTrash } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { twMerge } from 'tailwind-merge';
import type { InferType } from 'yup';

import { Button, Text } from '@/components';
import type { backgroundTableCommunitySchema, backgroundTableSchema } from '@/yup';

import { Select } from './select';

type BackgroundTableSchemaInferType = InferType<typeof backgroundTableSchema>;
type BackgroundTableCommunitySchemaInferType = InferType<typeof backgroundTableCommunitySchema>;

type Option = { value: string; label: string };

interface CommunityListSelectInterface {
  control: Control<BackgroundTableSchemaInferType>;
  options: Option[];
  isLoading?: boolean;
}

export const CommunityListSelect = (props: CommunityListSelectInterface) => {
  const { control, options, isLoading = false } = props;

  const workTableId = useWatch({ control, name: 'id' });

  return (
    <Controller
      control={control}
      name="communities"
      defaultValue={[]}
      render={({ field }) => {
        const { value, onChange } = field;

        const handleAddCommunity = () => {
          const newCommunity: BackgroundTableCommunitySchemaInferType = {
            id: crypto.randomUUID(),
            workTableId,
            number: String(isEmpty(value) ? '1' : String((value?.length || 0) + 1)),
            members: [],
          };
          onChange([...(value || []), newCommunity]);
        };
        const handleRemoveCommunity = (communityId: string) => {
          onChange((value || []).filter((c) => c.id !== communityId));
        };
        const handleAddMember = (communityId: string, memberId: string) => {
          let changedValues: BackgroundTableCommunitySchemaInferType[] = [];
          if (!isEmpty(value) && value) {
            changedValues = value.map((community) => {
              const noExistsMember = isEmpty(
                community.members.find((member) => member.recordId === memberId),
              );
              if (community.id === communityId && noExistsMember) {
                return {
                  ...community,
                  members: [...community.members, { communityId, recordId: memberId }],
                };
              }
              return community;
            });
          }
          onChange(changedValues);
        };
        const handleRemoveMember = (communityId: string, memberId: string) => {
          onChange(
            (value || []).map((c) => {
              if (c.id === communityId) {
                return {
                  ...c,
                  members: c.members.filter((member) => member.recordId !== memberId),
                };
              }
              return c;
            }),
          );
        };

        return (
          <div className="flex flex-col gap-4">
            {(value || []).map((community, index) => {
              return (
                <div
                  key={`${community.id}-${index}`}
                  className={twMerge(
                    'flex flex-col',
                    'rounded-lg border',
                    'bg-neutral-50 p-4',
                    'dark:bg-neutral-800',
                  )}>
                  <div className={twMerge('flex items-center justify-between', 'mb-[40px]')}>
                    <Text className="font-bold">Comunidade {index + 1}</Text>

                    <Button
                      variant="outline"
                      className="h-[40px]"
                      onClick={() => handleRemoveCommunity(community.id)}>
                      <BiTrash />
                    </Button>
                  </div>

                  <div className={twMerge('flex flex-col gap-2', 'mb-[12px]')}>
                    {community.members &&
                      community.members.map((member) => {
                        const findedMember = options.find(
                          (option) => option.value === member.recordId,
                        );
                        return (
                          <div
                            key={member.recordId}
                            className={twMerge('flex items-center justify-between gap-1')}>
                            <Text>{findedMember?.label || member.recordId}</Text>
                            <Button
                              variant="outline"
                              className="h-[40px]"
                              onClick={() =>
                                handleRemoveMember(community.id, member.recordId || '')
                              }>
                              <GrClose />
                            </Button>
                          </div>
                        );
                      })}
                  </div>

                  <Select
                    onChange={(record) => handleAddMember(community.id, record)}
                    val=""
                    options={options}
                    isLoading={isLoading}
                  />
                </div>
              );
            })}

            <Button variant="outline" className="w-full" onClick={handleAddCommunity}>
              <BiPlus /> Adicionar comunidade
            </Button>
          </div>
        );
      }}
    />
  );
};
