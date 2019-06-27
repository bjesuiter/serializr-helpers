/**
 * This serializr PropertySchema can be used with @serializable(MomentSerializationSchema)
 * to make moment.js Moment objects serializable
 * @type {PropSchema}
 */
import {custom, PropSchema, SKIP} from 'serializr';
import moment, {Moment} from 'moment';
import {MomentSerializationOptions} from "./moment-serialization-options";
import {JsonType} from "./json-type";

function buildSerializer(defaultValue?: JsonType) {
    return (value: Moment | undefined) => {
        //value.format is used here to output a datetime with attached offset to utc
        //value.toJson would normalize the output to utc,
        // which would make it impossible to reconstruct the original timezone

        // intended use of == vs. === to include null when checking for undefined
        if (value == undefined) {
            // logger.debug('Moment object will be skipped in serialization - object is undefined');
            return (defaultValue) ? defaultValue : SKIP;
        }

        return value.toISOString();
    };
}

function buildDeserializer(useUtc?: boolean) {
    return (jsonValue: string) => {
        return (useUtc) ? moment.utc(jsonValue): moment(jsonValue);
    }
}


/**
 * TODO: Add customization to this schema
 * Idea: Create a factory function, which generates a PropSchema for Moment
 * Can accept a MomentSerializationOption object which can have
 *      - what to do, when value is undefined?
 *      - how to format the string serialization
 *      - how to handle utc and local time
 */

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
        buildSerializer(options.valueIfUndefined),
        buildDeserializer(options.useUtc)
    );
}
