import React, { FormEvent, useState } from 'react';
import { InputField, Button, Modal } from '../components';
import api from '../services';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, showErrorAlert, showSuccessAlert } from '../utils';

interface State {
    email: string,
    password: string
}

export const Login: React.FC = () => {
    const [state, setUseState] = useState<State>({
        email: '',
        password: ''
    })

    const setState = (data: Partial<State>) => setUseState((State) => Object.assign({}, State, data))
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const {email, password} = state;
        try{
            const { data } = await api.auth.login({
                email,
                password
            });
            if(data.token){
                showSuccessAlert("Login Succesfull");
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            }else{
                throw new Error('Authentication Failed')
            }
        }catch(err: any){
            console.error(err)
            showErrorAlert(`Problem loggin in: ${err.message}`)
        }
    }

    return (
        <Modal>
            <Typography element={'h4'}  className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
            </Typography>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <InputField 
                    label='Your Email'
                    type='email'
                    name='email'
                    id='email'
                    value={state.email}
                    onChange={(email) => setState({email})}
                    placeholder='name@company.com'
                    required
                />
                <InputField 
                    label='Password'
                    type='password'
                    name='password'
                    id='password'
                    value={state.password}
                    onChange={(password) => setState({password})}
                    placeholder='********'
                    required
                />
                <Button type="submit">Sign in</Button>
                <Typography element={'p'} className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                </Typography>
            </form>
        </Modal>
    );
};