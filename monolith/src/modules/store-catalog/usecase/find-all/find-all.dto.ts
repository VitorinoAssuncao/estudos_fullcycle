export interface FindAllDTO{
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[];
}