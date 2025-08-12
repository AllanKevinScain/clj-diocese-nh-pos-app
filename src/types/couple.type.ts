import type { RecordType } from '@/types';

export type RecordCoupleType = {
  id: string;
  workPreference: 'sala' | 'cozinha' | 'sem-preferencia';
  externalCouple: boolean;
  cookCouple: boolean;
  womanName: string;
  womanNickname: string;
  womanPhone: string;
  womanInstagram: string;
  womanBirthDate: string;
  coursesOneDone: string;
  coursesTwoDone: string;
  coursesThreeDone: string;
  coursesDone: string;
  currentGroupFunction: string;
  participatedOtherGroups: string;
  womanSpiritualLife: string[];
  familyLife: 'boa' | 'regular' | 'inexistente';
  religiousWeddingDate: string;
  participatedInRetreat: boolean;
  motivationToParticipate: string;
  parishIndication: string[];
  recordId: string;
};

export interface RecordCoupleResponseInterface {
  id: string;
  typeOfRecord: RecordType;
  courseNumber: string;
  parishAcronym: string;
  recordNumber: string;
  candidateName: string;
  nickname: string;
  birthDate: string;
  candidatePhone: string;
  instagram: string;
  priest: string;
  parishChapel: string;
  spiritualLife: string[];
  observationsCoordinator: string;
  observationsDed: string;
  disease: null;
  medication: null;
  allergy: null;
  dataConsent: boolean;
  createdAt: string;
  updatedAt: string;
  recordCouple: RecordCoupleType;
}
