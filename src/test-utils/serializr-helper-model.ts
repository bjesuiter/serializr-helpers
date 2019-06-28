import {list, primitive, serializable} from "serializr";

export const demoProp: string = 'Bob der Baumeister';

export const demoArray: string[] = [
    'Lilly',
    'Gunnar',
    'Fjordojan'
];

export class SerializrHelperModel {

    @serializable(primitive())
    demoProp: string = demoProp;

    @serializable(list(primitive()))
    demoArray: string[] = demoArray;

}
