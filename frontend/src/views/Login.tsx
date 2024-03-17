import React, { FormEvent, useState } from 'react';
import { InputField } from '../components';
import api from '../services';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

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
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            }else{
                throw new Error('Authentication Failed')
            }
        }catch(error){
            console.error(error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
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
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};