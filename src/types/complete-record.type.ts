import type {
  CandidatePoslllSchemaBaseInfertype,
  CandidatePosllSchemaBaseInfertype,
  CandidatePoslSchemaBaseInfertype,
  CoupleSchemaBaseInfertype,
  PosDefaultInferType,
  TeamWorkSchemaBaseInfertype,
} from '@/yup';

export interface CompleteRecordInterface
  extends PosDefaultInferType,
    Partial<TeamWorkSchemaBaseInfertype>,
    Partial<CoupleSchemaBaseInfertype>,
    Partial<CandidatePoslSchemaBaseInfertype>,
    Partial<CandidatePosllSchemaBaseInfertype>,
    Partial<CandidatePoslllSchemaBaseInfertype> {}
