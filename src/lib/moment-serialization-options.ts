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

        constructor() {

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
         * Applies only to deserialization
         */
        public useUtc () {
            this.useUtcFlag = true;
            return this;
        }

        public build() {
            return new MomentSerializationOptions(this);
        }
    }

}
