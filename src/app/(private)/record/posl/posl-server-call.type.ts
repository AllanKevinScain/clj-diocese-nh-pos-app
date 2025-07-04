import type { RecordType } from '@/types';

export interface RecordPoslResponseInterface {
  id: string;
  typeOfRecord: RecordType;
  courseNumber: number;
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
  disease: string;
  medication: string;
  allergy: string;
  dataConsent: true;
  createdAt: null;
  updatedAt: null;
  recordPOSl: {
    id: string;
    godfatherName: string;
    godfatherPhone: string;
    godfatherEmail: string;
    affinityWithGodfather: string;
    attitudeCommunication: string;
    doctrineCommunication: string;
    godfatherResponsibility: string;
    candidateSpirit: string;
    candidateDisposition: string;
    candidateParticipation: string;
    fatherSituation: string;
    motherSituation: string;
    livesWith: string[];
    otherWho: string;
    parentsReligion: string;
    parentsComment: string;
    recordId: string;
  };
}
