import {SerializrHelperModel} from "../test-utils/serializr-helper-model";
import {
    deserializeFromJson,
    deserializeFromPojo,
    deserializeJson,
    serializeJson,
    serializeToJson,
    serializeToPojo
} from "./serializr-helpers";
import {deserialize, serialize} from "serializr";

describe('Serializr Helpers', () => {

    it('serialize to JSON', () => {
        const helper = new SerializrHelperModel();
        const targetJson = serializeToJson(helper);
        const validateJson = JSON.stringify(serialize(helper));

        expect(targetJson).toMatchSnapshot();
        expect(targetJson).toEqual(validateJson);
    });

    it('deserialize from JSON', () => {
        const helperModel = new SerializrHelperModel();
        const helperJson = serializeToJson(helperModel);
        const targetModel = deserializeFromJson(SerializrHelperModel, helperJson);
        const validateModel = deserialize(SerializrHelperModel, JSON.parse(helperJson));

        expect(targetModel).toEqual(validateModel);
        expect(targetModel).toBeInstanceOf(SerializrHelperModel);
        expect(validateModel).toBeInstanceOf(SerializrHelperModel);
    });

    it('serialize JSON alias for serializeToJson', () => {
        const helper = new SerializrHelperModel();
        const targetJson = serializeJson(helper);
        const validateJson = JSON.stringify(serialize(helper));

        expect(targetJson).toMatchSnapshot();
        expect(targetJson).toEqual(validateJson);
    });

    it('deserialize JSON alias for deserializeFromJson', () => {
        const helperModel = new SerializrHelperModel();
        const helperJson = serializeJson(helperModel);
        const targetModel = deserializeJson(SerializrHelperModel, helperJson);
        const validateModel = deserialize(SerializrHelperModel, JSON.parse(helperJson));

        expect(targetModel).toEqual(validateModel);
        expect(targetModel).toBeInstanceOf(SerializrHelperModel);
        expect(validateModel).toBeInstanceOf(SerializrHelperModel);
    });

    it('serialize To Pojo', () => {
        const helperModel = new SerializrHelperModel();
        const targetPojo = serializeToPojo(helperModel);
        const validatePojo = serialize(helperModel);

        expect(targetPojo).toEqual(validatePojo);
    });

    it('deserialize from Pojo', () => {
        const helperModel = new SerializrHelperModel();
        const helperPojo = serialize(helperModel);
        const targetModel = deserializeFromPojo(SerializrHelperModel, helperPojo);
        const validateModel = deserialize(SerializrHelperModel, helperPojo);

        expect(targetModel).toEqual(validateModel);
        expect(targetModel).toBeInstanceOf(SerializrHelperModel);
        expect(validateModel).toBeInstanceOf(SerializrHelperModel);
    });
});
