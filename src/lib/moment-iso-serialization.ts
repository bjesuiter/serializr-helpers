/**
 * This serializr PropertySchema can be used with @serializable(MomentSerializationSchema)
 * to make moment.js Moment objects serializable
 * @type {PropSchema}
 */
import {custom, PropSchema, SKIP} from 'serializr';
import moment, {Moment} from 'moment';

/**
 * TODO: Add customization to this schema
 * Idea: Create a factory function, which generates a PropSchema for Moment
 * Can accept a MomentSerializationOption object which can have
 *      - what to do, when value is undefined?
 *      - how to format the string serialization
 *      - how to handle utc and local time
 */
export const MomentIsoSerialization: PropSchema =
    custom((value: Moment) => {
        //value.format is used here to output a datetime with offset to utc attached
        //value.toJson would normalize the output to utc,
        // which would make it impossible to reconstruct the original timezone

        // intended use of == vs. === to include null when checking for undefined
        if (value == undefined) {
            // logger.debug('Moment object will be skipped in serialization - object is undefined');
            return SKIP;
        }

        return value.toISOString();
    }, (jsonValue: string) => {
        return moment(jsonValue);
    });
