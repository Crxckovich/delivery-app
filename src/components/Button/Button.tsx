import styles from './Button.module.css';
import {ButtonProps} from "./Button.props.ts";
import cn from 'classnames';

function Button({children, className, appearance = 'small', ...props}: ButtonProps) {
  return (
      <button className={cn(styles['button'], className, {
        [styles['small']]: appearance === 'small',
        [styles['accent']]: appearance === 'accent'
      })} {...props}>{children}</button>
  );
}

export default Button;
