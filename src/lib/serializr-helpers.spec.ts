import {SerializrHelperModel} from "../test-utils/serializr-helper-model";
import {deserializeFromJson, serializeToJson} from "./serializr-helpers";
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
});
