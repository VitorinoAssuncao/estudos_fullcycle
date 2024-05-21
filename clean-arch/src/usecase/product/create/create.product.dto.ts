export  interface CreateProductInput {
    type: string;
    name: string;
    price: number;
}

export interface CreateProductOutput {
    id: string;
}
