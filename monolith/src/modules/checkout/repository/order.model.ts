import {  BelongsTo, Column,  ForeignKey,  HasMany,  Model, PrimaryKey, Table } from "sequelize-typescript";
import ClientModel from "./client.order.model";
import ClientOrderModel from "./client.order.model";
import ProductOrderModel from "./product.order.model";

@Table({
    tableName: "orders",
    timestamps: false,
})
export default class OrderModel extends Model{
    @PrimaryKey
    @Column
    declare id:string;

    @ForeignKey(() => ClientOrderModel)
    @Column({allowNull: false})
    declare client_id:string;


    @BelongsTo(() => ClientOrderModel)
    declare client:ClientModel;
    
     @HasMany(() => ProductOrderModel, {onUpdate: "CASCADE", onDelete: "CASCADE"})
    declare products?:ProductOrderModel[];

    @Column({allowNull: false})
    declare status:string;
}