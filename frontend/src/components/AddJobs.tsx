import React, { useState } from 'react';
import { Job } from '../../../models/job';
import { InputField } from './InputField';
import api from '../services';

interface IAddJobsProps {
    setJobs: (data: Job) => void
}

interface State {
    company: string,
    position: string,
}

export const AddJobs: React.FC<IAddJobsProps> = ({setJobs}) => {
    const [state, setUseState] = useState<State>({
        company: '',
        position: ''
    })
    const setState = (data: Partial<State>) => setUseState(State => Object.assign({}, State, data));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const {company, position} = state;
            const {data} = await api.jobs.createJob({
                company,
                position
            })
            setJobs(data.job);
        }catch(err){
            console.error(err);
        }
    }

    return (
        <form className='flex gap-2 w-full mt-6 mb-10' onSubmit={handleSubmit}>
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
            <button type="submit" className="w-1/2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 self-end">Add Job</button>
        </form>
    );
};