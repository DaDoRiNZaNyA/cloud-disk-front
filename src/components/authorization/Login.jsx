import React, {useState} from 'react';
import './login.css'
import Input from "../../utils/input/Input";
import { login } from '../../actions/user';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();

    return (
        <div className='login'>
            <div className="login__header">Авторизация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="login__btn" onClick={() => dispatch(login(email, password))}>Войти</button>
        </div>
    );
};

export default Login;