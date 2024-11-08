import { MenuListProps } from "./MenuList.props.ts";
import ProductCard from "@/components/ProductCard/ProductCard.tsx";

export function MenuList({ products, onCardClick }: MenuListProps) {
    return (
        <>
            {products.map(product => (
                <div key={product.id}>
                    <ProductCard
                        id={product.id}
                        name={product.name}
                        ingredients={product.ingredients}
                        image={product.image}
                        price={product.price}
                        tag={product.tag}
                        rating={product.rating}
                        onCardClick={onCardClick}
                    />
                </div>
            ))}
        </>
    );
}

export default MenuList;