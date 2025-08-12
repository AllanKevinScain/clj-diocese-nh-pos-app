import type { RecordType } from '@/types';

export type RecordWorkType = {
  id: string;
  courseOneDone: string;
  courseTwoDone: string;
  courseThreeDone: string;
  workedInWhichCourses: string;
  graceStateAwareness: string;
  notFalsifyData: false;
  showLifeTestimony: string;
  currentGroupFunction: string;
  parishActivities: string;
  doingConfirmation: false;
  notConfirmationBecause: string;
  instrument: null;
  reasonToWork: string;
  workPreference: string;
  willingToOtherFunction: false;
  parishIndication: string[];
  recordId: string;
};

export interface RecordWorkResponseInterface {
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
  dataConsent: true;
  createdAt: string;
  updatedAt: string;
  recordWork: RecordWorkType;
}
