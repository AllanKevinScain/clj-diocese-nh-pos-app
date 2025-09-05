type MembersType = {
  communityId: string;
  recordId: string;
};

export type CommunityType = {
  id: string;
  number: string;
  members: MembersType[];
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
  communities: CommunityType[];
}
