import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table({
    modelName:"products-catalog",
    tableName: "products",
    timestamps: false,
})
export default class StoreProductModel extends Model{
    @PrimaryKey
    @Column
    declare id:string;

    @Column({allowNull: false})
    declare name:string;

    @Column({allowNull: false})
    declare description:string;

    @Column({allowNull: false})
    declare salesPrice:number;
}