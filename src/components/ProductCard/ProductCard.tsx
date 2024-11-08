import styles from './ProductCard.module.css';
import { ProductCardProps } from "./ProductCard.props.ts";
import Button from "../Button/Button.tsx";
import cn from 'classnames';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store.ts";
import { cartActions } from "@/store/cart.slice.ts";
import React from 'react';

function ProductCard(props: ProductCardProps) {
    const dispatch = useDispatch<AppDispatch>();

    const add = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(cartActions.add(props.id));
    };

    const handleCardClick = () => {
        // Открываем диалог, передавая текущий продукт
        props.onCardClick(props);
    };

    return (
        <div className={styles['card']} onClick={handleCardClick}>
            <div className={styles['head']} style={{ backgroundImage: `url('${props.image}')` }}>
                <div className="flex flex-row justify-between items-end px-6 py-5 h-full grow shrink basis-1">
                    <div className={styles['rating']}>
                        <img src="/star-icon.svg" alt="star" />
                        {props.rating}
                    </div>
                    {props.tag && (
                        <div className={cn(styles['tag'])}>
                            {props.tag}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles['footer']}>
                <div className="flex flex-col gap-3">
                    <div className={styles['title']}>
                        {props.name}
                    </div>
                    <div className={styles['description']}>
                        {props.ingredients.join(', ')}
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className={styles['price']}>
                        {props.price}
                        <span className={styles['currency']}> ₽</span>
                    </div>
                    <Button
                        appearance={'small'}
                        className={styles['add-to-cart']}
                        onClick={(e) => {
                            e.stopPropagation();
                            add(e);
                        }}
                    >
                        Выбрать
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;