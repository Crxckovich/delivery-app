import {Outlet} from "react-router-dom";
import styles from './AuthLayout.module.css';

export function AuthLayout() {
    return <div className={styles['layout']}>
        <div className={styles['content']}>
            <Outlet />
        </div>
        <div className={styles['image']}>
        </div>
    </div>
}