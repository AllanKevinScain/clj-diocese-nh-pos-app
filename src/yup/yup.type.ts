import type * as yup from 'yup';

import type { loginSchema } from './login-schama';
import type { poslSchema } from './pos-l-schema';
import type { teamWorkSchema } from './team-work-schema';

/* LOGIN */

export type LoginDataType = yup.InferType<typeof loginSchema>;

/* POS 1 */

export type CreatePos1DataType = yup.InferType<typeof poslSchema>;

export type KeyOfCreatePos1DataType = keyof CreatePos1DataType;

/* TEAM WORK */

export type CreateTeamWorkDataType = yup.InferType<typeof teamWorkSchema>;

export type KeyOfCreateTeamWorkDataTypeType = keyof CreateTeamWorkDataType;
