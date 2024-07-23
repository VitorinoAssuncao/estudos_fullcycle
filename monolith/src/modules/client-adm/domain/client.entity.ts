import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import ID from "../../@shared/domain/vo/id.vo"

type ClientProps = {
    id? : ID;
    name: string;
    document: string;
    email: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Client extends BaseEntity implements AggregateRoot{
    private _name: string;
    private _document: string;
    private _email: string;
    private _address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    }


    constructor(props: ClientProps){
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._document = props.document;
        this._email = props.email;
        this._address = {
            street: props.street,
            number: props.number,
            complement: props.complement,
            city: props.city,
            state: props.state,
            zipCode: props.zipCode
        };
    }

    get name(){
        return this._name;
    }

    get document(){
        return this._document;
    }

    get email(){
        return this._email;
    }

    get street(){
        return this._address.street;
    }

    get number(){
        return this._address.number;
    }

    get complement(){
        return this._address.complement;
    }

    get city(){
        return this._address.city;
    }

    get state(){
        return this._address.state;
    }

    get zipCode(){
        return this._address.zipCode;
    }
}