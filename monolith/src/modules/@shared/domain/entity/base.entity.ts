import ID from "../vo/id.vo";

export default class BaseEntity{
    private _id : ID;
    private _createdAt : Date;
    private _updatedAt : Date;

    constructor(id?: ID){
        this._id = id;
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    get id() :ID{
        return this._id;
    }

    get createdAt():Date{
        return this._createdAt;
    }

    get updatedAt():Date{
        return this._updatedAt;
    }
}