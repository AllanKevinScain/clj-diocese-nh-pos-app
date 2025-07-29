import * as yup from 'yup';

import { posDefault } from '../pos-default';

function requiredOtherResident(value: string | undefined | null, { parent }: yup.AnyObject) {
  if (parent.livesWith.includes('outro')) {
    return !!value;
  }

  return true;
}

function requiredOtherReligion(value: string | undefined | null, { parent }: yup.AnyObject) {
  if (parent.parentsReligion.includes('outro')) {
    return !!value;
  }

  return true;
}

const poslSchemaBase = yup.object({
  recordPOSl: yup.object({
    recordId: yup.string().optional(),
    // Padrinho
    godfatherName: yup.string().required('Campo Obrigatório!'),
    godfatherPhone: yup
      .string()
      .min(14, 'Mínimo de 14 caracteres!')
      .max(15, 'Máximo de 15 caracteres!')
      .required('Campo Obrigatório!'),
    godfatherEmail: yup.string().email('E-mail inválido').required('Campo Obrigatório!'),
    affinityWithGodfather: yup.string().required('Campo Obrigatório!'),
    attitudeCommunication: yup.string().required('Campo Obrigatório!'),
    doctrineCommunication: yup.string().required('Campo Obrigatório!'),
    godfatherResponsibility: yup.string().required('Campo Obrigatório!'),

    // Personalidade
    candidateSpirit: yup.string().required('Campo Obrigatório!'),
    candidateDisposition: yup.string().required('Campo Obrigatório!'),
    candidateParticipation: yup.string().required('Campo Obrigatório!'),
    fatherSituation: yup.string().required('Campo Obrigatório!'),
    motherSituation: yup.string().required('Campo Obrigatório!'),
    livesWith: yup.array().of(yup.string()).min(1, 'Campo Obrigatório!'),
    otherWho: yup.string().nullable().test({
      name: 'requiredOtherResident',
      message: 'Campo obrigatório!',
      test: requiredOtherResident,
    }),
    parentsReligion: yup.string().required('Campo Obrigatório!'),
    otherReligion: yup.string().nullable().test({
      name: 'requiredOtherReligion',
      message: 'Campo obrigatório!',
      test: requiredOtherReligion,
    }),
    parentsComment: yup.string().required('Campo Obrigatório!'),
  }),
});

export const poslSchema = posDefault.concat(poslSchemaBase);
