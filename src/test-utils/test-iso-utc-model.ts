import {serializable} from "serializr";
import {Moment} from "moment";
import {MomentSerializationSchema} from "../lib/moment-serialization-schema";

export class TestIsoUtcModel {

    @serializable(MomentSerializationSchema({useUtc: true}))
    public testMoment: Moment;

    constructor(testMoment: Moment) {
        this.testMoment = testMoment;
    }


}
