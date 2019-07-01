export type JsonValue = string | boolean | number | JsonObject | JsonArray;

export interface JsonObject {
    [x:string]: JsonValue
}

export interface JsonArray extends Array<JsonValue> {

}
