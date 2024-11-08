import {ProductInterface} from "../../../interfaces/product.interface.ts";

export interface MenuListProps {
    products: ProductInterface[];
    onCardClick: (product: ProductInterface) => void;
}