import styles from './CartItem.module.css';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store.ts";
import { cartActions } from "@/store/cart.slice.ts";
import { CartItemProps } from "@/components/CartItem/CartItem.props.ts";

function CartItem(props: CartItemProps) {
    const dispatch = useDispatch<AppDispatch>();

    const increase = () => {
        dispatch(cartActions.add(props.id));
    };

    const decrease = () => {
        dispatch(cartActions.decrease(props.id));
    };

    const remove = () => {
        dispatch(cartActions.remove(props.id));
    };

    return (
        <div className={styles['cart-item']}>
            <div className="w-[350px]">
                <div className={styles['cart-item__image']} style={{ backgroundImage: `url('${props.image}')` }}></div>
            </div>
            <div className={styles['cart-item__description']}>
                <div className={styles['cart-item__info']}>
                    <div className={styles['cart-item__title']}>
                        {props.name}
                    </div>
                    <div className={styles['cart-item__price']}>
                        {props.price}
                        <span> ₽</span>
                    </div>
                </div>
                <div className={styles['cart-item__buttons-group']}>
                    <div className={styles['cart-item__actions']}>
                        <button
                            className="w-full flex justify-center items-center rounded-l-[32px] md:rounded-l-full text-white bg-white border border-secondary"
                            onClick={decrease}>
                            <img src="/minus-icon.svg" alt="minus" />
                        </button>
                        <span className="px-5 lg:px-8 flex justify-center items-center py-2 md:py-3 text-accent font-primaryRegular font-bold text-xl bg-secondary">
                            {props.count}
                        </span>
                        <button className="w-full flex justify-center items-center rounded-r-[32px] md:rounded-r-full text-white bg-accent"
                                onClick={increase}>
                            <img src="/plus-icon.svg" alt="plus" />
                        </button>
                    </div>
                    <button onClick={remove}>
                        <img src="/remove-icon.svg" alt="remove" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;