export interface ListProductInput {}

type ProductDto = {
    id: string;
    name: string;
    price: number;
}

export interface ListProductOutput {
    products: ProductDto[];
}