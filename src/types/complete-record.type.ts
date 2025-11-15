import type {
  CoupleSchemaBaseInfertype,
  PosDefaultInferType,
  PosllSchemaBaseInfertype,
  PoslSchemaBaseInfertype,
  TeamWorkSchemaBaseInfertype,
} from '@/yup';

export interface CompleteRecordInterface
  extends PosDefaultInferType,
    Partial<PoslSchemaBaseInfertype>,
    Partial<PosllSchemaBaseInfertype>,
    Partial<TeamWorkSchemaBaseInfertype>,
    Partial<CoupleSchemaBaseInfertype> {}
