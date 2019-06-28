import {SerializrHelperModel} from "../test-utils/serializr-helper-model";
import {serializeToJson} from "./serializr-helpers";
import {serialize} from "serializr";

describe('Serializr Helpers', () => {

    it('serialize to JSON', () => {
        const helper = new SerializrHelperModel();
        const targetJson = serializeToJson(helper);
        const validateJson = JSON.stringify(serialize(helper));

        expect(targetJson).toMatchSnapshot();
        expect(targetJson).toEqual(validateJson);
    });
});
