import {Moment} from "moment";
import {JsonValue} from "./json-types";

export type DeserializationErrorPolicy = 'throw' | 'log-error' | 'log-warn' | 'silent';

export interface MomentSerializationOptions {

    /**
     * This value will be returned, if the moment value is undefined, which should have been serialized,
     * It's a default value.
     * It must be a JSON compatible value or a Moment Object.
     * This means, it must be of one type of: string | boolean | number | object | [].
     * If this is not set, this moment value will be skipped in serialization.
     *
     * Applies to serialization only.
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

    /**
     * These are the options on what to do when deserialization fails.
     * throw - throw an error
     * log-error - log an error to the console
     * log-warn - log a warning to the console
     * silent - log nothing
     */
    deserializationErrorPolicy: DeserializationErrorPolicy;

    /**
     * The default moment object to be used when deserialized values are illegal.
     */
    restoreDefault?: Moment;
}

export const MomentSerializationDefaults: MomentSerializationOptions = {
    useUtc: false,
    serializationFormat: 'ISO',
    deserializationErrorPolicy: 'log-error'
};
