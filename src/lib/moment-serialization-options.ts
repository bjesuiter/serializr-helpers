import {JsonType} from "./json-type";

export class MomentSerializationOptions {

    public readonly valueIfUndefined: any;
    public readonly useUtc: any;

    constructor(builder: MomentSerializationOptions.Builder) {
        this.valueIfUndefined = builder.valueIfUndefined;
        this.useUtc = builder.useUtcFlag;
    }
}

export namespace MomentSerializationOptions {

    export class Builder {

        public valueIfUndefined?: JsonType;
        public useUtcFlag?: boolean;
        public momentSerializationFormat: string;

        constructor() {
            this.momentSerializationFormat = 'ISO';
        }

        /**
         * If the moment value is undefined, which should have been serialized,
         * this value will be returned. It must be a JSON compatible value.
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
        public useMomentSerializationFormat(format: string) {
            this.momentSerializationFormat = format;
        }

        /**
         * Build the MomentSerializationOptions objects
         */
        public build(): MomentSerializationOptions {
            if (this.momentSerializationFormat == undefined) {
                this.momentSerializationFormat = 'ISO'
            }

            return new MomentSerializationOptions(this);
        }
    }

}
