import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import ID from "../../@shared/domain/vo/id.vo"

type ClientProps = {
    id? : ID;
    name: string;
    email: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Client extends BaseEntity implements AggregateRoot{
    private _name: string;
    private _email: string;
    private _address: string;

    constructor(props: ClientProps){
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._email = props.email;
        this._address = props.address;
    }

    get name(){
        return this._name;
    }

    get email(){
        return this._email;
    }

    get address(){
        return this._address;
    }
}