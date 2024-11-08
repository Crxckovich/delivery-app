import Heading from "../../components/Heading/Heading.tsx";
import styles from '../Login/Login.module.css';
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {register, userActions} from "../../store/user.slice.ts";

export type RegisterForm = {
    name: {
        value: string;
    };
    email: {
        value: string;
    };
    password: {
        value: string;
    };
}

export function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {jwt, registerErrorMessage} = useSelector((s: RootState) => s.user)

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        e.preventDefault()
        dispatch(userActions.clearRegisterError());
        const target = e.target as typeof e.target & RegisterForm;
        const {name, email, password} = target;
        dispatch(register({name: name.value, email: email.value, password: password.value }));
    };

    return <div className={styles['login']} onSubmit={submit}>
        <Heading>РЕГИСТРАЦИЯ</Heading>
        {registerErrorMessage && <div className={styles['error']}>{registerErrorMessage}
        </div>}
        <form className={styles['form']}>
            <div className={styles['field']}>
                <label htmlFor="name">Ваше имя</label>
                <Input placeholder='Имя' id='name' type='text'/>
            </div>
            <div className={styles['field']}>
                <label htmlFor="email">Ваш Email</label>
                <Input placeholder='Почта' name='email' id='email' type='email'/>
            </div>
            <div className={styles['field']}>
                <label htmlFor="password">Ваш пароль</label>
                <Input placeholder='Пароль' name='password' id='password' type='password'/>
            </div>
            <Button appearance={'accent'}>
                ЗАРЕГИСТРИРОВАТЬСЯ
            </Button>
            <div className={styles['link']}>
                <Link to={'/auth/login'}>Уже есть аккаунт?</Link>
            </div>
        </form>
    </div>;

}