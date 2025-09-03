import * as yup from 'yup';

export const filterRecordsSchema = yup.object({
  parishAcronym: yup.string().nullable(),
  candidateName: yup.string().nullable(),
  nickname: yup.string().nullable(),
  birthDate: yup.string().nullable(),
  candidatePhone: yup.string().nullable(),
  instagram: yup.string().nullable(),
  priest: yup.string().nullable(),
  parishChapel: yup.string().nullable(),
  courseNumber: yup.string().nullable(),
  recordNumber: yup.string().nullable(),
  typeOfRecord: yup.mixed<'POSl' | 'POSll' | 'WORK' | 'COUPLE_WORK'>().nullable(),
  search: yup.string().nullable(),
});
