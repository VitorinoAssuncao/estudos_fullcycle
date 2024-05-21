export interface FindCustomerInput{
    id: string;
}

export interface FindCustomerOutput{
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zipCode: string;
        city: string;
    };
}