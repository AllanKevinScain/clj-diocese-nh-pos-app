import * as yup from "yup";

import { loginSchema } from "./login-schama";
import { pos1Schema } from "./pos-l-schema";
import { teamWorkSchema } from "./team-work-schema";

/* LOGIN */

export type LoginDataType = yup.InferType<typeof loginSchema>;

/* POS 1 */

export type CreatePos1DataType = yup.InferType<typeof pos1Schema>;

export type KeyOfCreatePos1DataType = keyof CreatePos1DataType;

/* TEAM WORK */

export type CreateTeamWorkDataType = yup.InferType<typeof teamWorkSchema>;

export type KeyOfCreateTeamWorkDataTypeType = keyof CreateTeamWorkDataType;
