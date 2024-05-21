export interface CreateCostumerInput{
    name: string;
    address:{
        street: string;
        number: number;
        zipCode: string;
        city: string;
    }
}

export interface CreateCostumerOutput{
    id: string;
}