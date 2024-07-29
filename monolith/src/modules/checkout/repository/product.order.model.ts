import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import ProductDetailsModel from "./product.model";
import OrderModel from "./order.model";


@Table({
    tableName: "order_products",
    timestamps: false,
})
export default class ProductOrderModel extends Model{
    @PrimaryKey
    @Column
    declare id:string;

    @ForeignKey(() => OrderModel)
    @Column({allowNull: false})
    declare order_id:string;

    @ForeignKey(() => ProductDetailsModel)
    @Column({allowNull: false})
    declare product_id:string;

    @BelongsTo(() => ProductDetailsModel)
    declare product:ProductDetailsModel;
}