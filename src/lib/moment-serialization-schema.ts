/**
 * This serializr PropertySchema can be used with @serializable(MomentSerializationSchema)
 * to make moment.js Moment objects serializable
 * @type {PropSchema}
 */
import {custom, PropSchema, SKIP} from 'serializr';
import moment, {Moment} from 'moment';
import {JsonType} from "./json-type";

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
            return (useUtc) ? value.toISOString() : value.toISOString(true);
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
export const MomentIsoSerialization: PropSchema = custom(buildSerializer(), buildDeserializer());

export function MomentSerializationSchema(customize?: boolean) {
    if (!customize) {
        return MomentIsoSerialization;
    }

    return new MomentSerializationSchema.Builder();
}

export namespace MomentSerializationSchema {

    export class Builder {

        public valueIfUndefined?: JsonType;
        public useUtcFlag: boolean = false;
        public serializationFormat: string | 'ISO' = 'ISO';

        constructor() {

        }

        /**
         * This value will be returned, if the moment value is undefined, which should have been serialized,
         * It must be a JSON compatible value.
         * This means, it must be of one type of: string | boolean | number | object | [].
         * If this is not set, this moment value will be skipped in serialization.
         *
         * Applies only to serialization.
         * @param value
         */
        public useValueIfUndefined(value: JsonType) {
            this.valueIfUndefined = value;
            return this;
        }

        /**
         * Uses moment.utc() instead of moment(), which parses the variable as utc
         * and does not convert the time into local time of the running node instance.
         *
         * Applies to serialization & deserialization
         */
        public useUtc () {
            this.useUtcFlag = true;
            return this;
        }

        /**
         *
         * @param string format which is used to serialize moment objects into
         * @default complete RFC-3339 format, which is equal to ISO-8601, for example: 2009-01-01T12:00:00+01:00
         *          would be written as YYYY-MM-DDTHH:mm:ss.SSSZZ. In contrast to moment js default,
         *          this default keeps the offset in serialization. This breaks the compatibility with javascript Date,
         *          but if it's not needed, this is the more complete option.
         */
        public useSerializationFormat(format: string) {
            this.serializationFormat = format;
        }

        public build() : PropSchema {
           return custom(
                buildSerializer(this.valueIfUndefined, this.useUtcFlag, this.serializationFormat),
                buildDeserializer(this.useUtcFlag)
            )
        }

    }
}
