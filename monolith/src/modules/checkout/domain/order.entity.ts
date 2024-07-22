import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import ID from "../../@shared/domain/vo/id.vo";
import Client from "./client.entity";
import Product from "./product.entity";

type OrderProps = {
    id?: ID;
    client: Client;
    products: Product[];
    status: string;
}

export default class Order extends BaseEntity implements AggregateRoot{
    private _client: Client;
    private _products: Product[];
    private _status: string;

    constructor(props: OrderProps){
        super(props.id);
        this._client = props.client;
        this._products = props.products;
        this._status = props.status || "pending";
    }

    approved():void{
        this._status = "approved";
    }

    get client(){
        return this._client;
    }

    get products(){
        return this._products;
    }

    get status(){
        return this._status;
    }

    get total(){
        return this._products.reduce((total, product) => total + product.salesPrice, 0);
    }
}