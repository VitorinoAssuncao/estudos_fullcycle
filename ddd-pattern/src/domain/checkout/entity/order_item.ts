export default class OrderItem{
    private _id:string;
    private _price:number=0;
    private _productID:string;
    private _name:string;
    private _quantity:number;

    constructor(id:string,  price:number, productID:string,name:string, quantity:number){
        this._id = id;
        this._price = price;
        this._productID = productID;
        this._name = name;
        this._quantity = quantity;
    }

    get id():string{
        return this._id;
    }

    get price(): number {
        return this._price;
    }

    get productID():string{
        return this._productID;
    }

    get name():string{
        return this._name;
    }

    get quantity():number{
        return this._quantity
    }

}
