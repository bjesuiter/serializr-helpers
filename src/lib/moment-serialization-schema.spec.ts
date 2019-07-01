import moment, {Moment} from "moment";
import {TestIsoModel} from "../test-utils/test-iso-model";
import {serialize, SKIP} from "serializr";
import {TestIsoUtcModel} from "../test-utils/test-iso-utc-model";
import {deserializeFromJson} from "./serializr-helpers";
import {buildDeserializer, buildSerializer} from "./moment-serialization-schema";

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

    describe('Test buildSerializer function', () => {

        it('should skip undefined moment in serialization', () => {
            const serializeFunction = buildSerializer();
            const result = serializeFunction(undefined);
            expect(result).toEqual(SKIP);
        });

        it('should serialize default value string: "null"', () => {
            const defaultString = 'null';
            const serializeFunction = buildSerializer(defaultString);
            const result = serializeFunction(undefined);
            expect(result).toEqual(defaultString);
        });

        it('should serialize default value moment: moment("1990-01-01T00:00:00.000Z")', () => {
            const unixStartTimeString = "1990-01-01T00:00:00.000Z";
            const defaultMoment: Moment = moment(unixStartTimeString);
            const serializeFunction = buildSerializer(defaultMoment, true);
            const result = serializeFunction(undefined);
            expect(result).toEqual(unixStartTimeString);
        });

    });

    describe('Test buildDeserializer function', () => {

        describe('Test deserializationErrorPolicies', () => {

            it('should throw error', () => {
                const deserializeFunc = buildDeserializer('throw');
                expect(() => deserializeFunc('some-illegal-moment', () => {
                }))
                    .toThrowErrorMatchingSnapshot();
            });

            it('should log error', () => {
                const mockLogger = {
                    error: jest.fn(),
                    info: jest.fn(),
                    debug: jest.fn(),
                    log: jest.fn(),
                    warn: jest.fn(),
                };
                const deserializeFunc = buildDeserializer('log-error', false, undefined, mockLogger);
                deserializeFunc('some-illegal-moment', () => {
                });

                expect(mockLogger.error).toHaveBeenCalledTimes(1);
            });

            it('should log warning', () => {
                const mockLogger = {
                    error: jest.fn(),
                    info: jest.fn(),
                    debug: jest.fn(),
                    log: jest.fn(),
                    warn: jest.fn(),
                };
                const deserializeFunc = buildDeserializer('log-warn', false, undefined, mockLogger);
                deserializeFunc('some-illegal-moment', () => {
                });

                expect(mockLogger.warn).toHaveBeenCalledTimes(1);
            });
        });

        describe('Test defaultDeserializationValue', () => {

            it('should deserialize to default value', () => {
                const defaultMoment = moment("1990-01-01T00:00:00.000Z");
                const deserializeFunc = buildDeserializer(
                    'silent',
                    true,
                    defaultMoment);
                const result = deserializeFunc('some-illegal-moment', () => {
                });
                expect(result.isValid()).toBe(true);
                expect(result.isSame(defaultMoment)).toBe(true);
            });

            it('should throw error when default deserialization value is invalid', () => {
                const deserializeFunc = buildDeserializer('silent', false, moment('default-illegal-moment'));
                expect(() => deserializeFunc('some-illegal-moment', () => {
                }))
                    .toThrowErrorMatchingSnapshot();
            });
        });

    });

});
