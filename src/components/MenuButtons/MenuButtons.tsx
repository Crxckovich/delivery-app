import { NavLink } from "react-router-dom";
import { Badge } from "@/components/ui/badge.tsx";
import cn from 'classnames';
import styles from '@/layouts/Layout/Layout.module.css';
import {MenuButtonsProps} from "@/components/MenuButtons/MenuButtons.props.ts";

const MenuButtons  = ({ totalItemsCount }: MenuButtonsProps) => {
    return (
        <>
            <NavLink to="/" className={({ isActive }) => cn(styles['link'], {
                [styles.active]: isActive
            })}>
                <img className={styles['icon']} src="/menu-icon.svg" alt="menu" />
                МЕНЮ
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) => cn(styles['link'], {
                [styles.active]: isActive
            })}>
                <img className={styles['icon']} src="/cart-icon.svg" alt="cart" />
                {totalItemsCount > 0 && <Badge variant="default">{totalItemsCount}</Badge>}
                КОРЗИНА
            </NavLink>
        </>
    );
};

export default MenuButtons;