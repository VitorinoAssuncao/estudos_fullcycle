export interface AddClientFacadeInputDTO{
    id?: string;
    name: string;
    document: string,
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

export interface FindClientFacadeInputDTO {
    id: string;
}

export interface FindClientFacadeOutputDTO {
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

export default interface ClientAdmFacadeInterface{
    addClient(input: AddClientFacadeInputDTO): Promise<void>;
    findClient(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO>;
}