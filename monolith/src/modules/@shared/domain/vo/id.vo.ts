import { UUIDV4 } from "sequelize";
import VO from "./vo.interface";
import {v4 as uuidv4} from "uuid";

export default class ID implements VO{
    private _id: string;

    constructor(id?: string){
        this._id = id || uuidv4();
    }

    get value(){
        return this._id;
    }
}