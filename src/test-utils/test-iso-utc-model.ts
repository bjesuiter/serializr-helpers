import {serializable} from "serializr";
import {Moment} from "moment";
import {MomentSerializationSchema} from "../lib/moment-serialization-schema";

export class TestIsoUtcModel {

    @serializable(new MomentSerializationSchema.Builder()
        .useUtc()
        .build()
    )
    public testMoment: Moment;

    constructor(testMoment: Moment) {
        this.testMoment = testMoment;
    }


}
