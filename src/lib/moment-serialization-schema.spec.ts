import moment, {Moment} from "moment";
import {TestIsoModel} from "../test-utils/test-iso-model";
import {serialize} from "serializr";

describe('MomentSerializationScheme', function () {

    const testMomentString = '2019-06-10T08:50:23.559+02:00';
    let testIsoMoment: Moment;
    let testIsoModel: TestIsoModel;

    beforeEach(() => {
        testIsoMoment = moment(testMomentString);
        testIsoModel = new TestIsoModel(testIsoMoment);
    });

    describe('MomentIsoSerialization', () => {

        it('serialize', () => {
            const js = serialize(testIsoModel);
            expect(js.testMoment).toEqual(testMomentString);
        });

        it('deserialize', () => {
            const js = JSON.parse(`
            {
                "testMoment": "${testMomentString}"
            }
            `);

            expect(js).toEqual(serialize(testIsoModel));
        })

    });

});
