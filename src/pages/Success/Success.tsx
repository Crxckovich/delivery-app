import Button from "@/components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import styles from './Success.module.css';

export function Success() {
    const navigate = useNavigate();
    return (
        <div className={styles['success']}>
            <img src="/pizza-img.png" alt="pizza"/>
            <div className={styles['text']}>Ваш заказ успешно оформлен!</div>
            <Button appearance={'accent'} onClick={() => navigate('/')}>
                В МЕНЮ
                <img src="/menu-icon-2.svg" alt="menu"/>
            </Button>
        </div>
    );
}