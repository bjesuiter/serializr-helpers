import { ClazzOrModelSchema, deserialize as decode, serialize as encode } from 'serializr';

//Note: Serializr has two serialize function signatures
//If the second one is needed, look here for how to do correct overloading in typecript:
//https://stackoverflow.com/questions/13212625/typescript-function-overloading
//Main Information: You have only one body which gets augmented with different function signatures above it.
//The function has then to test on missing / misplaced arguments.

export type SerializrCallback<T> = (err: any, result: T) => void | undefined;
export type SerializrArrayCallback<T> = (err: any, result: T[]) => void;

/**
 * Serializes a typescript object to a JSON string with optional formatting
 * @param {T} instance - The object to serialize, is of type T
 * @param formattingSpace - an optional spacer for JSON stringify
 * @return {string}
 */
export function serializeToJson<T>(//
    //serializr params
    instance: T

    //JSON.stringify params
    , formattingSpace?: string | number): string {

    return JSON.stringify(encode(instance), undefined, formattingSpace);
}

/**
 * Deserializes a typescript object from JSON string
 * @param {ClazzOrModelSchema<T>} modelschema
 * @param {string} jsonString
 * @param {(err: any, result: T) => void} callback
 * @param customArgs
 * @return {T}
 */
export function deserializeFromJson<T>(modelschema: ClazzOrModelSchema<T>, jsonString: string,
                                       callback?: SerializrCallback<T>, customArgs?: any): T;
export function deserializeFromJson<T>(modelschema: ClazzOrModelSchema<T>, jsonString: string,
                                       callback?: SerializrArrayCallback<T>, customArgs?: any): T[] {
    return decode(modelschema, JSON.parse(jsonString), callback, customArgs);
}

/**
 * An alias method for serialize from serializr package
 * Encodes a complex object structure into a POJO
 * @param {T} instance
 */
export function serializeToPojo<T>(instance: T) {
    return encode(instance);
}

/**
 * An alias method for deserialize from serializr package
 * @param {ClazzOrModelSchema<T>} modelschema
 * @param jsObject
 * @param {(err: any, result: T) => void} callback
 * @param customArgs
 * @return {T}
 */
export function deserializeFromPojo<T>(modelschema: ClazzOrModelSchema<T>, jsObject: any,
                                       callback?: SerializrCallback<T>, customArgs?: any): T;
export function deserializeFromPojo<T>(modelschema: ClazzOrModelSchema<T>, jsObject: any[],
                                       callback?: SerializrArrayCallback<T>, customArgs?: any): T[] {
    return decode(modelschema, jsObject, callback, customArgs);
}

/**
 * Alias for serializeToJson
 */
export function serializeJson<T>(//
    //serializr params
    instance: T

    //JSON.stringify params
    , formattingSpace?: string | number): string {

    return serializeToJson(instance, formattingSpace);
}

/**
 * Alias for deserializeFromJson
 */
export function deserializeJson<T>(modelschema: ClazzOrModelSchema<T>, jsonString: string, callback?: SerializrCallback<T>, customArgs?: any): T;
export function deserializeJson<T>(modelschema: ClazzOrModelSchema<T>, jsonString: string, callback?: SerializrArrayCallback<T>, customArgs?: any): T[] {
    return decode(modelschema, JSON.parse(jsonString), callback, customArgs);
}
