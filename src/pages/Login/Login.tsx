import Heading from "../../components/Heading/Heading.tsx";
import styles from './Login.module.css';
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {login, userActions} from "../../store/user.slice.ts";

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
}

export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {jwt, loginErrorMessage} = useSelector((s: RootState) => s.user)

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        e.preventDefault()
        dispatch(userActions.clearLoginError());
        const target = e.target as typeof e.target & LoginForm;
        const {email, password} = target;
        await sendLogin(email.value, password.value);
    };

    const sendLogin = async (email: string, password: string) => {
        dispatch(login({ email, password }));
    };

    return <div className={styles['login']} onSubmit={submit}>
        <Heading>ВХОД</Heading>
        {loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}
        </div>}
        <form className={styles['form']}>
            <div className={styles['field']}>
                <label htmlFor="email">Ваш Email</label>
                <Input placeholder='Почта' name='email' id='email' type='email'/>
            </div>
            <div className={styles['field']}>
                <label htmlFor="password">Ваш пароль</label>
                <Input placeholder='Пароль' name='password' id='password' type='password'/>
            </div>
            <Button appearance={'accent'}>
                ВОЙТИ
                <img src="/login-icon.svg" alt="login"/>
            </Button>
            <div className={styles['link']}>
                <Link to={'/auth/register'}>Ещё нет аккаунта?</Link>
            </div>
        </form>
    </div>;

}