export interface UpdateProductInput {
    id: string;
    name: string;
    price: number;
}

export interface UpdateProductOutput {
    name: string;
    price: number;
}