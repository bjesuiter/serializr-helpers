import {list, primitive, serializable} from "serializr";
import {MomentSerializationSchema} from "../lib/moment-serialization-schema";
import moment, {Moment} from "moment";

export const demoProp: string = 'Bob der Baumeister';

export const demoArray: string[] = [
    'Lilly',
    'Gunnar',
    'Fjordojan'
];

export const demoMomentString = '2019-06-10T08:50:23.559+02:00';
export const demoMoment: Moment = moment(demoMomentString);

export class SerializrHelperModel {

    @serializable(MomentSerializationSchema())
    public demoMoment: Moment = demoMoment;

    @serializable(primitive())
    demoProp: string = demoProp;

    @serializable(list(primitive()))
    demoArray: string[] = demoArray;

}
