import { useListRecords } from '../use-list-records';
import { usePoslll } from '../use-poslll';

export function useEspecificRecords() {
  const { listPoslll } = usePoslll();
  const { listWorkCandidateRecords } = useListRecords();

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
    listCandidatesRecordsByNumberCourse,
  };
}
