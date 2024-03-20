export default class OrderItem{
    private _id:string;
    private _price:number=0;
    private _productID:string;
    private _quantity:number;

    constructor(id:string,  price:number, productID:string, quantity:number){
        this._id = id;
        this._price = price;
        this._productID = productID;
        this._quantity = quantity;
    }

    get id():string{
        return this._id;
    }

    get price(): number {
        return this._price;
    }

    get quantity():number{
        return this._quantity
    }

}
