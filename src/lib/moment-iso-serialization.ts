/**
 * This serializr PropertySchema can be used with @serializable(MomentSerializationSchema)
 * to make moment.js Moment objects serializable
 * @type {PropSchema}
 */
import {custom, PropSchema, SKIP} from "serializr";
import {Moment} from "moment";
import moment = require("moment");

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

        if (value === undefined || value == null) {
            // logger.debug('Moment object will be skipped in serialization - object is undefined');
            return SKIP;
        }

        return value.toISOString();
    }, (jsonValue) => {
        return moment(jsonValue);
    });
