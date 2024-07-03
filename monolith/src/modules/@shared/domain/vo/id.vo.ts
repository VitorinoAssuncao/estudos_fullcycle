import VO from "./vo.interface";
import { v4 as uuid } from "uuid";

export default class ID implements VO{
    private _value: string;

    constructor(value?: string){
        this._value = value || uuid();
    }

    get value(): string{
        return this._value;
    }
}