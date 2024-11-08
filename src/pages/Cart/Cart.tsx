import Heading from "../../components/Heading/Heading.tsx";
import styles from "./Cart.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store.ts";
import {useEffect, useState} from "react";
import {ProductInterface} from "@/interfaces/product.interface.ts";
import CartItem from "@/components/CartItem/CartItem.tsx";
import axios from "axios";
import {PREFIX} from "@/helpers/API.ts";
import Button from "@/components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {cartActions} from "@/store/cart.slice.ts";

const DELIVERY_FEE = 169;

export function Cart() {
    const [cartProducts, setCartProducts] = useState<ProductInterface[]>([]);
    const items = useSelector((s: RootState) => s.cart.items)
    const jwt = useSelector((s: RootState) => s.user.jwt);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const total = items.map(i => {
                        const product = cartProducts.find(p => p.id === i.id)
                        if (!product) {
                            return 0;
                        }
                        return i.count * product.price;
                        }).reduce((acc, i) => acc += i, 0)

    const getItem = async (id: number) => {
        const {data} = await axios.get<ProductInterface>(`${PREFIX}/products/${id}`)
        return data;
    }

    const loadAllItems = async () => {
        const result = await Promise.all(items.map(i => getItem(i.id)));
        setCartProducts(result);
    };

    const checkout = async () => {
        await axios.post(`${PREFIX}/order`, {
            products: items
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch(cartActions.clean());
        navigate('/success')
    }

    useEffect(() => {
        loadAllItems();
    }, [items]);

    return <>
        <div className={styles['head']}>
            <Heading>КОРЗИНА</Heading>
        </div>
        <div className={styles['cards']}>
            <div className="xl:col-span-2 col-span-1 flex flex-col gap-y-10">
                {items.map(i => {
                const product = cartProducts.find(p => p.id === i.id)
                if (!product) {
                    return;
                }
                return <div className=''>
                    <CartItem key={product.id} count={i.count} {...product} />
                </div>;
            })}
            </div>
            <div className={styles['checkout']}>
                <div className="gap-5 flex-col flex">
                    <div className="flex justify-between">
                        <h2 className={styles['result']}>Итог</h2>
                        <div className={styles['price']}>{total + DELIVERY_FEE}<span> ₽</span>
                        </div>
                    </div>
                    <hr className='border-primary-stroke rounded-full'/>
                    <div className="flex justify-between flex-col gap-5">
                        <div className={styles['cart']}>
                            Корзина
                            <div className="text-accent">{total}<span> ₽</span></div>
                        </div>
                        <div className={styles['cart']}>
                            Доставка
                            <div className="text-accent">{DELIVERY_FEE}<span> ₽</span></div>
                        </div>
                    </div>
                </div>
                <Button appearance={'accent'} className='sticky' onClick={checkout}>
                    ОФОРМИТЬ
                    <img src="/card-icon.svg" alt="card"/>
                </Button>
            </div>
        </div>

    </>;
}