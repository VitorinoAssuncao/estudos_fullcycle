import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import ID from "../../@shared/domain/vo/id.vo";

type TransactionProps = {
    id?: ID;
    amount: number;
    order_id: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
    };

    export default class Transaction extends BaseEntity implements AggregateRoot{
        private _amount: number;
        private _order_id: string;
        private _status: string;

        constructor(props: TransactionProps) {
            super(props.id, props.createdAt, props.updatedAt);
            this._amount = props.amount;
            this._order_id = props.order_id;
            this._status = props.status || 'pending';

            this.validate();
        }

        get amount(): number {
            return this._amount;
        }

        get order_id(): string {
            return this._order_id;
        }

        get status(): string {
            return this._status;
        }

        validate(): void{
            if(this._amount <= 0){
                throw new Error('Amount must be greater than 0');
            }
        }

        approve(): void{
            this._status = 'approved';
        }

        reject(): void{
            this._status = 'rejected';
        }

        process(): void{
            if (this.amount >= 100){
                this.approve();
            } else {
                this.reject();
            }
        }
    }


