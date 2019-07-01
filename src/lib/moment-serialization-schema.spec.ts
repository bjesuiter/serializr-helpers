import moment from "moment";
import {TestIsoModel} from "../test-utils/test-iso-model";
import {serialize} from "serializr";
import {TestIsoUtcModel} from "../test-utils/test-iso-utc-model";
import {deserializeFromJson} from "./serializr-helpers";
import {TestUndefinedMomentModel} from "../test-utils/test-undefined-moment-model";

describe('MomentSerializationScheme', function () {

    const testIsoLocalString = '2019-06-10T08:50:23.559+02:00';
    const testIsoUtcString = '2019-06-10T06:50:23.559Z';

    describe('MomentIsoSerialization', () => {
        describe('with TestIsoModel', () => {
            it('serialize local -> local time', () => {
                const testIsoModel = new TestIsoModel(moment(testIsoLocalString));
                const js = serialize(testIsoModel);
                expect(js.testMoment).toEqual(testIsoLocalString);
            });
            it('serialize utc -> local time', () => {
                const testIsoModel = new TestIsoModel(moment(testIsoUtcString));
                const js = serialize(testIsoModel);
                expect(js.testMoment).toEqual(testIsoLocalString);
            });

            it('deserialize local -> local time', () => {
                const isoLocalMoment = moment(testIsoLocalString);
                const recovered = deserializeFromJson(TestIsoModel, `{
                    "testMoment": "${testIsoLocalString}"
                 }`);
                expect(recovered.testMoment.isSame(isoLocalMoment)).toBe(true);
            });

            it('deserialize utc -> local time', () => {
                const isoLocalMoment = moment(testIsoLocalString);
                const recovered = deserializeFromJson(TestIsoModel, `{
                    "testMoment": "${testIsoUtcString}"
                 }`);
                expect(recovered.testMoment.isSame(isoLocalMoment)).toBe(true);
            });
        });

        describe('with TestIsoUtcModel', () => {
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
                const recovered = deserializeFromJson(TestIsoUtcModel, `{
                    "testMoment": "${testIsoUtcString}"
                 }`);
                expect(recovered.testMoment.isSame(isoUtcMoment)).toBe(true);
            });

            it('deserialize local -> utc time', () => {
                const isoUtcMoment = moment(testIsoUtcString);
                const recovered = deserializeFromJson(TestIsoUtcModel, `{
                    "testMoment": "${testIsoLocalString}"
                 }`);
                expect(recovered.testMoment.isSame(isoUtcMoment)).toBe(true);
            });
        });

    });

    describe('Test serialization of undefined moment', () => {

        it('should skip undefined moment in serialization', () => {
            const testIsoModel = new TestUndefinedMomentModel();
            const js = serialize(testIsoModel);
            expect(js).toEqual({});
        });

    });

});
