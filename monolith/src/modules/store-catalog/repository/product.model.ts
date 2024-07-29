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

    @Column({allowNull: true})
    declare salesPrice:number;

    @Column({allowNull: true})
    declare purchasePrice:number;

    @Column({allowNull: true})
    declare stock:number;

    @Column({allowNull: false})
    declare createdAt:Date;

    @Column({allowNull: false})
    declare updatedAt:Date;
}