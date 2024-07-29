export interface AddProductInputDTO {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    salesPrice: number;
    stock: number;
  }
  
  export interface AddProductOutputDto {
    id: string;
    name: string;
    description: string;
    purchasePrice: number;
    salesPrice: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
  }