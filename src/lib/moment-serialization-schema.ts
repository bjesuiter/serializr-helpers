/**
 * This serializr PropertySchema can be used with @serializable(MomentSerializationSchema)
 * to make moment.js Moment objects serializable
 * @type {PropSchema}
 */
import {custom, PropSchema, SKIP} from 'serializr';
import moment, {Moment} from 'moment';
import {MomentSerializationDefaults, MomentSerializationOptions} from "./moment-serialization-options";

export function buildSerializer(valueIfUndefined?: any, useUtc = false, serializationFormat: string = 'ISO') {
    return (value: Moment | undefined) => {
        //value.format is used here to output a datetime with attached offset to utc
        //value.toJson would normalize the output to utc,
        // which would make it impossible to reconstruct the original timezone

        // intended use of == vs. === to include null when checking for undefined
        if (value == undefined) {

            if (!moment.isMoment(valueIfUndefined)) {
                // Moment object will be skipped in serialization if no default value is set
                // or json-compatible default value will be returned
                return (valueIfUndefined) ? valueIfUndefined : SKIP;
            } else {
                // default value is a moment object => serialize as normal moment object
                value = valueIfUndefined;
            }
        }

        if (serializationFormat === 'ISO') {
            // see documentation for toISO String for keepOffset explanation:
            // https://momentjs.com/docs/#/displaying/as-iso-string/
            return (useUtc) ? value.toISOString() : value.toISOString(true);
        }

        value = (useUtc) ? value.utc() : value;

        return value.format(serializationFormat);

    };
}

export function buildDeserializer(useUtc?: boolean) {
    return (jsonValue: string) => {
        return (useUtc) ? moment.utc(jsonValue): moment(jsonValue);
    }
}

/**
 * This factory function returns a serialization schema for Moment objects.
 *
 * @default The default schema skips undefined moment objects in serialization and
 *          keeps timezone offset while serialization and deserialization.
 *          This differs from default moment.toIsoString() behavior, which converts local timestamps (with like +02:00 offset)
 *          to UTC in serialization (Strings with Z as offset)
 * @param options
 * @constructor
 */
export function MomentSerializationSchema(options: MomentSerializationOptions = MomentSerializationDefaults): PropSchema {
    return custom(
        buildSerializer(options.valueIfUndefined, options.useUtc, options.serializationFormat),
        buildDeserializer(options.useUtc)
    );
}
