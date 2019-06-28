import {serializable} from "serializr";
import {MomentIsoSerialization} from "../src/lib/moment-serialization-schema";
import {Moment} from "moment";

export class TestModel {

    @serializable(MomentIsoSerialization)
    public testMoment: Moment;

    constructor(testMoment: Moment) {
        this.testMoment = testMoment;
    }


}
