export interface AddClientInputDTO{
    id?: string;
    name: string;
    document: string;
    email: string;
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    };
}

export interface AddClientOutputDTO{
    id: string;
    name: string;
    document: string;
    email: string;
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    };
    createdAt: Date;
    updatedAt: Date;
}