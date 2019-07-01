import {serializable} from "serializr";
import {Moment} from "moment";
import {MomentSerializationSchema} from "../lib/moment-serialization-schema";

export class TestUndefinedMomentModel {

    @serializable(MomentSerializationSchema())
    public testMoment?: Moment;

    constructor(testMoment?: Moment) {
        this.testMoment = testMoment;
    }
}
