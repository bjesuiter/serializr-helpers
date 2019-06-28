import {serializable} from "serializr";
import {Moment} from "moment";
import {MomentSerializationSchema} from "../lib/moment-serialization-schema";

export class TestIsoModel {

    @serializable(MomentSerializationSchema())
    public testMoment: Moment;

    constructor(testMoment: Moment) {
        this.testMoment = testMoment;
    }
}
