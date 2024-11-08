import {ProductInterface} from "@/interfaces/product.interface.ts";

export interface ProductCardProps {
    id: number;
    name: string;
    ingredients: string[];
    image: string;
    price: number;
    tag?: string;
    rating: number;
    onCardClick: (product: ProductInterface) => void;
}