import ID from "../../../@shared/domain/vo/id.vo";

export interface FindClientInputDTO {
    id: ID;
}

export interface FindClientOutputDTO {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}