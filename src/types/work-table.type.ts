import type { Control } from 'react-hook-form';

import type { BackgroundTableSchemaInferType, CourseInferType } from '@/yup';

type MembersType = {
  communityId: string;
  recordId: string;
};

export type CommunityType<T> = {
  id: string;
  number: string;
  workTableId: string;
  members: T[];
};

export interface WorkTableResponseInterface {
  auxiliar: string;
  courseNumber: string;
  auxiliarLiturgy: string;
  auxiliarSecretary: string;
  bar: string;
  base: string;
  coordinator: string;
  coupleKitchenCoordinator: string;
  coupleSafeToBe: string;
  folkloreCoordinator: string;
  kitchenSpiritual: string;
  liturgy: string;
  secretary: string;
  cleanWorkRecords: string[];
  copeWorkRecords: string[];
  kitchenWorkRecords: string[];
  communities: CommunityType<MembersType>[];
}

export interface WorkTableRecordsResponseInterface {
  courseNumber?: string;
  // pos lll
  coordinator: string;
  base: string;
  auxiliar: string;
  kitchenSpiritual: string;
  liturgy: string;
  secretary: string;

  // pos ll
  coupleSafeToBe: string;
  coupleKitchenCoordinator: string;
  auxiliarSecretary: string;
  auxiliarLiturgy: string;
  bar: string;
  folkloreCoordinator: string;

  // arrays
  cleanWorkRecords: string[];
  copeWorkRecords: string[];
  kitchenWorkRecords: string[];
  communities: CommunityType<string>[];
}

export type WorkTableWithRecords = { ok: boolean; data: WorkTableRecordsResponseInterface };

export interface TabComponentWorkTableInterface {
  course: CourseInferType;
  control: Control<BackgroundTableSchemaInferType>;
}
