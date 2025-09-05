'use client';

import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { BiPlus, BiTrash } from 'react-icons/bi';

import { Button } from '../button';
import { SelectDefaultComponent } from '../select-default/select';

type Option = { value: string; label: string };

interface DynamicListSelectProps<T extends FieldValues> {
  control: Control<T>;
  id: Path<T>;
  options: Option[];
  isLoading?: boolean;
}

export const DynamicListSelect = <T extends FieldValues>(props: DynamicListSelectProps<T>) => {
  const { control, id, options, isLoading = false } = props;

  return (
    <Controller
      control={control}
      name={id}
      render={({ field }) => {
        const { onChange, value = [] } = field;

        const handleSelectChange = (index: number, newValue: string) => {
          const updated = [...(value as string[])];
          updated[index] = newValue;
          onChange(updated);
        };

        const handleAdd = () => {
          onChange([...(value || []), '']);
        };

        const handleRemove = (index: number) => {
          const updated = value.filter((_: string, i: number) => i !== index);
          onChange(updated.length ? updated : []);
        };

        return (
          <div className="flex flex-col gap-3">
            {value.map((val: string, index: number) => (
              <div key={`${index}-${id}`} className="flex items-center gap-2">
                <SelectDefaultComponent
                  options={options}
                  value={val}
                  onChange={(newValue) => handleSelectChange(index, newValue || '')}
                  isLoading={isLoading}
                />

                <Button onClick={() => handleRemove(index)}>
                  <BiTrash />
                </Button>
              </div>
            ))}

            <Button className="w-full" onClick={handleAdd}>
              <BiPlus /> Adicionar linha
            </Button>
          </div>
        );
      }}
    />
  );
};
