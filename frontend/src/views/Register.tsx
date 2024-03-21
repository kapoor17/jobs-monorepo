import React, { FormEvent, useState } from 'react';
import { InputField, Button, Modal } from '../components';
import api from '../services';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, showErrorAlert, showSuccessAlert } from '../utils';

interface State {
    email: string,
    password: string,
    name: string
}

export const Register: React.FC = () => {
    const [state, setUseState] = useState<State>({
        email: '',
        password: '',
        name: ''
    })

    const setState = (data: Partial<State>) => setUseState((State) => Object.assign({}, State, data))
    const navigate = useNavigate();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        const {email, password, name} = state;
        try{
            const { data } = await api.auth.register({
                email,
                password,
                name
            });
            if(data.token){
                showSuccessAlert('Registration Succesfull');
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            }else{
                throw new Error('Authentication Failed')
            }
        }catch(err: any){
            console.error(err)
            showErrorAlert(`Problem registering user: ${err.message}`)
        }
    }

    return (
        <Modal>
            <Typography element={'h4'}  className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign up!
            </Typography>
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
                <Button type="submit">Sign in</Button>
                <Typography className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account ? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                </Typography>
            </form>
        </Modal>
    );
};