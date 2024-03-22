import { Table, Model, PrimaryKey, Column, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import CustomerModel from "./customer";
import OrderItemModel from "./order-item";

@Table({
  tableName: "order",
  timestamps: false,
})
export default class Order extends Model {
    @PrimaryKey
    @Column
    declare id: string;
  
    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customer_id: string;
  
    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;
  
    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];
  
    @Column({ allowNull: false })
    declare total: number;
}