export interface ListCustomerInput {}

type CustomerDto ={
    id: string;
    name: string;
    address:{    
        street: string;
        number: number;
        zipCode: string;
        city: string;
    };

}

export interface ListCustomerOutput {
    customers: CustomerDto[];
}