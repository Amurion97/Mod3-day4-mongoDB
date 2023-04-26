/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema } from 'mongoose';
import { IArtist } from "./artist";
import { IUser } from "./user";
export interface ISong {
    songTitle?: string;
    songURL?: string;
    artist?: Array<IArtist>;
    owner?: IUser;
}
declare const Song: import("mongoose").Model<ISong, {}, {}, {}, import("mongoose").Document<unknown, {}, ISong> & Omit<ISong & {
    _id: import("mongoose").Types.ObjectId;
}, never>, Schema<ISong, import("mongoose").Model<ISong, any, any, any, import("mongoose").Document<unknown, any, ISong> & Omit<ISong & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ISong, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ISong>> & Omit<import("mongoose").FlatRecord<ISong> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>>;
export { Song };
