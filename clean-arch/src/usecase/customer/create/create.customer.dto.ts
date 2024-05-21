export interface InputCreateCustomer{
    name: string;
    address:{
        street: string;
        number: number;
        zipCode: string;
        city: string;
    }
}

export interface OutputCreateCustomer{
    id: string;
}