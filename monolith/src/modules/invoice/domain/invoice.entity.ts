import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/vo/address.vo";
import ID from "../../@shared/domain/vo/id.vo";

type InvoiceItemProps = {
    id?: string;
    name: string;
    price: number;

}

export class InvoiceItem extends BaseEntity{
    private _name: string;
    private _price: number;

    constructor(props: InvoiceItemProps) {
        super(new ID(props.id)),
        this._name = props.name;
        this._price = props.price;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }
}


type InvoiceProps = {
    id?: string;
    name: string;
    document: string;
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    };
    items: InvoiceItemProps[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: InvoiceItem[];

    constructor(props: InvoiceProps) {
        super(
            new ID(props.id), 
            props.createdAt, 
            props.updatedAt,
        );
        this._name = props.name;
        this._document = props.document;
        this._address = new Address(
            props.address.street, 
            props.address.number,
            props.address.complement, 
            props.address.city, 
            props.address.state, 
            props.address.zipCode,
        );
        this._items = props.items.map(item => new InvoiceItem(item));
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get address(): Address {
        return this._address;
    }

    get items(): InvoiceItem[] {
        return this._items;
    }

    calculateTotal(): number{
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }
}