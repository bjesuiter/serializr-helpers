/**
 * This serializr PropertySchema can be used with @serializable(MomentSerializationSchema)
 * to make moment.js Moment objects serializable
 * @type {PropSchema}
 */
import {custom, PropSchema, SKIP} from 'serializr';
import moment, {Moment} from 'moment';
import {MomentSerializationOptions} from "./moment-serialization-options";

function buildSerializer(valueIfUndefined?: any, useUtc = false, serializationFormat: string = 'ISO') {
    return (value: Moment | undefined) => {
        //value.format is used here to output a datetime with attached offset to utc
        //value.toJson would normalize the output to utc,
        // which would make it impossible to reconstruct the original timezone

        // intended use of == vs. === to include null when checking for undefined
        if (value == undefined) {
            // logger.debug('Moment object will be skipped in serialization - object is undefined');
            return (valueIfUndefined) ? valueIfUndefined : SKIP;
        }

        if (serializationFormat === 'ISO') {
            // see documentation for toISO String for keepOffset explanation:
            // https://momentjs.com/docs/#/displaying/as-iso-string/
            return (useUtc) ? value.toISOString(true) : value.toISOString();
        }

        value = (useUtc) ? value.utc() : value;

        return value.format(serializationFormat);

    };
}

function buildDeserializer(useUtc?: boolean) {
    return (jsonValue: string) => {
        return (useUtc) ? moment.utc(jsonValue): moment(jsonValue);
    }
}

/**
 * This is the default serialization schema.
 * It skips undefined moment objects and uses local time deserialization with `moment()` instead of moment.utc();
 */
const MomentIsoSerialization: PropSchema = custom(buildSerializer(), buildDeserializer());

export function MomentSerializationSchema(options?: MomentSerializationOptions): PropSchema {
    if (options == undefined) {
        return MomentIsoSerialization;
    }

    return custom(
        buildSerializer(options.valueIfUndefined, options.useUtc, options.serializationFormat),
        buildDeserializer(options.useUtc)
    );
}
