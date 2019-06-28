import moment from "moment";
import {TestModel} from "../test-utils/test-model";

describe('MomentSerializationScheme', function () {

    const testMoment = moment('2019-06-10T08:50.559+02:00');

    describe('MomentIsoSerialization', () => {

        it('should serialize correctly', () => {
            const testModel = new TestModel(testMoment);
        })

    });

    it('should serialize correctly', function () {

    });

});
