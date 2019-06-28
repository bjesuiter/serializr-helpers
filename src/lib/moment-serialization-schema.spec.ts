import moment from "moment";
import {TestIsoModel} from "../test-utils/test-iso-model";
import {serialize} from "serializr";
import {TestIsoUtcModel} from "../test-utils/test-iso-utc-model";
import {deserializeFromJson} from "./serializr-helpers";

describe('MomentSerializationScheme', function () {

    const testIsoLocalString = '2019-06-10T08:50:23.559+02:00';
    const testIsoUtcString = '2019-06-10T06:50:23.559Z';

    describe('MomentIsoSerialization', () => {
        describe('with localtime', () => {
            it('serialize', () => {
                const testIsoModel = new TestIsoModel(moment(testIsoLocalString));
                const js = serialize(testIsoModel);
                expect(js.testMoment).toEqual(testIsoLocalString);
            });

            it('deserialize', () => {
                const testIsoModel = new TestIsoModel(moment(testIsoLocalString));
                const js = JSON.parse(`{
                    "testMoment": "${testIsoLocalString}"
                 }`);
                expect(js).toEqual(serialize(testIsoModel));
            });
        });

        describe('with utc time', () => {
            it('serialize utc -> utc time', () => {
                const testIsoUtcModel = new TestIsoUtcModel(moment(testIsoUtcString));
                const js = serialize(testIsoUtcModel);
                expect(js.testMoment).toEqual(testIsoUtcString);
            });

            it('serialize local -> utc time', () => {
                const testIsoUtcModel = new TestIsoUtcModel(moment(testIsoLocalString));
                const js = serialize(testIsoUtcModel);
                expect(js.testMoment).toEqual(testIsoUtcString);
            });

            it('deserialize utc -> utc time', () => {
                const isoUtcMoment = moment(testIsoUtcString);
                const recoveredModel = deserializeFromJson(TestIsoUtcModel, `{
                    "testMoment": "${testIsoUtcString}"
                 }`);
                expect(recoveredModel.testMoment.isSame(isoUtcMoment)).toBe(true);
            });

            it('deserialize local -> utc time', () => {
                const isoUtcMoment = moment(testIsoUtcString);
                const recoveredModel = deserializeFromJson(TestIsoUtcModel, `{
                    "testMoment": "${testIsoLocalString}"
                 }`);
                expect(recoveredModel.testMoment.isSame(isoUtcMoment)).toBe(true);
            });
        });

    });

});
