export interface FindClientInputDTO {
    id: string;
}

export interface FindClientOutputDTO {
    id: string;
    name: string;
    document: string;
    email: string;
    address: {
        street: string;
        number: string;
        neighborhood: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
    };
    createdAt: Date;
    updatedAt: Date;
}