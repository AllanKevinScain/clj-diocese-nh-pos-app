import { useListRecords } from '../use-list-records';
import { usePoslll } from '../use-poslll';

export function useEspecificRecords() {
  const { listPoslll } = usePoslll();
  const { listAllRecords, listWorkCandidateRecords } = useListRecords();

  async function listWorkRecordsByNumberCourse(courseNumber: string) {
    return await listAllRecords({
      courseNumber: courseNumber,
      typeOfRecord: 'WORK',
    });
  }

  async function listCoupleRecordsByNumberCourse(courseNumber: string) {
    return await listAllRecords({
      courseNumber: courseNumber,
      typeOfRecord: 'COUPLE_WORK',
    });
  }

  async function listCandidatesRecordsByNumberCourse(courseNumber: string) {
    return await listWorkCandidateRecords({
      courseNumber: courseNumber,
      posl: true,
      work: true,
      coupleWork: true,
    });
  }

  return {
    listPoslll,
    listWorkRecordsByNumberCourse,
    listCoupleRecordsByNumberCourse,
    listCandidatesRecordsByNumberCourse,
  };
}
