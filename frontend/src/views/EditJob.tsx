import React, { FormEvent, useEffect, useState } from 'react';
import api from '../services';
import { useNavigate, useParams } from 'react-router-dom';
import { InputField } from '../components';
import { Else, If, Then } from '../utils';
import { Job } from '../../../models/job';

interface State {
    company: string,
    position: string ,
    error: string | null
}

export const EditJob: React.FC = () => {
    const [state, setUseState] = useState<State>({
        company: '',
        position: '',
        error: ''
    });

    const setState = (data: Partial<State>) => setUseState(State => Object.assign({}, State, data));

    const params = useParams();
    const _id = params._id as string;

    const navigate = useNavigate();

    const handleSubmit = async (jobID: string, e: FormEvent) => {
        e.preventDefault();

        try{
            const {company, position} = state;
            const {data} = await api.jobs.updateJob(jobID , {
                company,
                position
            })
            if(!!data.job) navigate('/dashboard');
        }catch(err){
            console.error(err);
        }
    }

    const onLoad = async (_id: string) => {
        try{
            const {data} = await api.jobs.getJob(_id);
            if(data.job){
                const {company, position} = data.job
                setState({
                    company,
                    position
                })
            }else{
                throw new Error('Invalid Job Id')
            }
        }catch(err){
            console.error(err);
            setState({error : "Job Id invalid"})
        }
    }

    useEffect(() => {
        onLoad(_id);
    }, [])

    return (
        <If condition={!state.error}>
            <Then>
                <h1>Update Job</h1>
                <form className='flex gap-2 w-full mt-6 mb-10' onSubmit={(e) => handleSubmit(_id, e)}>
                    <InputField 
                        label='Company' 
                        type='text'
                        value={state.company}
                        onChange={(company) => setState({company})}
                    />
                    <InputField 
                        label='Position' 
                        type='text'
                        value={state.position}
                        onChange={(position) => setState({position})}
                    />
                    <button type="submit" className="w-1/2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 self-end">Edit Job</button>
                </form>
            </Then>
            <Else>
                {state.error}
            </Else>
        </If>
    );
};