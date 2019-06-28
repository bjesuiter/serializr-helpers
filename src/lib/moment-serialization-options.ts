import {JsonType} from "./json-type";

export interface MomentSerializationOptions {
    valueIfUndefined?: JsonType;
    useUtc?: boolean;
    serializationFormat?: string | 'ISO';
}

export const MomentSerializationDefaults: MomentSerializationOptions = {
    useUtc: false,
    serializationFormat: 'ISO'
};
