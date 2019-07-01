import {Moment} from "moment";
import {JsonValue} from "./json-types";

export interface MomentSerializationOptions {

    /**
     * This value will be returned, if the moment value is undefined, which should have been serialized,
     * It must be a JSON compatible value.
     * This means, it must be of one type of: string | boolean | number | object | [].
     * If this is not set, this moment value will be skipped in serialization.
     *
     * Applies only to serialization.
     */
    valueIfUndefined?: JsonValue | Moment;

    /**
     * Uses moment.utc() instead of moment(), which parses the variable as utc
     * and does not convert the time into local time of the running node instance.
     *
     * Applies to serialization & deserialization
     */
    useUtc?: boolean;

    /**
     * String format which is used to serialize moment objects into, like 'YYYY-MM-DDTHH:mm:ss.SSSZZ'
     *
     * ISO-Value: complete RFC-3339 format, which is equal to ISO-8601, for example: 2009-01-01T12:00:00+01:00
     *            would be written as YYYY-MM-DDTHH:mm:ss.SSSZZ. In contrast to moment js default,
     *            this implementation keeps the offset in serialization.
     *            This breaks the compatibility with javascript Date.toIsoString(),
     *            but if it's not needed, this is the more complete option.
     */
    serializationFormat?: string | 'ISO';
}

export const MomentSerializationDefaults: MomentSerializationOptions = {
    useUtc: false,
    serializationFormat: 'ISO'
};
