import styles from './SearchInput.module.css';
import cn from "classnames";
import { forwardRef } from "react";
import {SearchInputProps} from "./SearchInput.props.ts";

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function Input({ className, isValid = true, ...props }, ref) {
    return (
        <div className={styles['input-wrapper']}>
            <input ref={ref} className={cn(styles['input'], className, {
                    [styles['invalid']]: isValid,
                })} {...props} />
            <img className={styles['icon']} src="/search-icon.svg" alt="search"/>
        </div>
    );
});

export default SearchInput;