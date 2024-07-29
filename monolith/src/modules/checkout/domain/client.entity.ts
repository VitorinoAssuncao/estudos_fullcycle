import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import ID from "../../@shared/domain/vo/id.vo";

type ClientProps = {
    id?: ID;
    name: string;
    document: string;
    email: string;
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    };
}

export default class Client extends BaseEntity implements AggregateRoot{
    private _name: string;
    private _email: string;
    private _document: string;
    private _address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    };

    constructor(props: ClientProps){
        super(props.id);
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

    get document(){
        return this._document;
    }

    get address(){
        return this._address;
    }
}