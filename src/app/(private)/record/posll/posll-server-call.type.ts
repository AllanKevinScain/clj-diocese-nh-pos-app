import type { RecordType } from '@/types';

export interface RecordPosllResponseInterface {
  id: string;
  typeOfRecord: RecordType;
  courseNumber: number;
  parishAcronym: string;
  recordNumber: number;
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
  disease?: string | null;
  medication?: string | null;
  allergy: string;
  dataConsent: boolean;
  createdAt: string;
  updatedAt: string;
  recordPOSll: {
    id: string;
    courseOneDone: string;
    motivationToParticipate: string;
    reasonForCLJII: string;
    approachToChrist: string;
    acceptsChurchDoctrine: string;
    commitmentToCLJ: string;
    perseveranceInCommunity: string;
    hideImportantInfo: boolean;
    currentGroupFunction: string;
    parishChapelActivities: string;
    notConfirmationBecause: string | null;
    recordId: string;
  };
}
