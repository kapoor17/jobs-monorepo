import React, { useState } from 'react';
import { InputField } from './';
import { AuthenticationResponse } from '../../../models/user';
import api from '../services';
import { Link } from 'react-router-dom';

interface State {
    email: string,
    password: string,
    name: string
}

export const RegisterModal: React.FC = () => {
    const [state, setUseState] = useState<State>({
        email: '',
        password: '',
        name: ''
    })

    const setState = (data: Partial<State>) => setUseState((State) => Object.assign({}, State, data))

    const handleRegister = async (e) => {
        e.preventDefault();
        const {email, password, name} = state;
        try{
            const { data } = await api.auth.register({
                email,
                password,
                name
            });
            if(data.token){
                localStorage.setItem('token', data.token)
            }else{
                throw new Error('Authentication Failed')
            }
        }catch(error){
            console.error(error)
        }
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign up!
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                            <InputField 
                                label='Your Name'
                                type='text'
                                name='name'
                                id='name'
                                value={state.name}
                                onChange={(name) => setState({name})}
                                placeholder='name@company.com'
                                required
                            />
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
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account ? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            </section>
    );
};