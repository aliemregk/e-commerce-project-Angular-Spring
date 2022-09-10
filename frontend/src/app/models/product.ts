export interface Product {
    id: number;
    name: string;
    description: string;
    material: string;
    unitPrice: number;
    unitsInStock: number;
    coverImgUrl: string;
    categoryId: number;
    discount: number;
}
