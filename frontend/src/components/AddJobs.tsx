import React, { FormEvent, useState } from 'react';
import { Job } from '../../../models/job';
import { InputField } from './InputField';
import api from '../services';
import { Typography, showErrorAlert, showSuccessAlert } from '../utils';
import { Button } from './Button';

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try{
            const {company, position} = state;
            const {data} = await api.jobs.createJob({
                company,
                position
            })
            showSuccessAlert("Job succesfully created!");
            setJobs(data.job);
        }catch(err: any){
            console.error(err);
            showErrorAlert(`Job could not be created: ${err.message}`)
        }
    }

    return (
        <section>
            <Typography element={'h3'}>Add Job</Typography>
            <form className='flex gap-2 w-full mt-4 mb-10' onSubmit={handleSubmit}>
                <InputField 
                    label='Company' 
                    type='text'
                    value={state.company}
                    onChange={(company) => setState({company})}
                    minLength={5}
                    maxLength={50}
                    required
                />
                <InputField 
                    label='Position' 
                    type='text'
                    value={state.position}
                    onChange={(position) => setState({position})}
                    minLength={5}
                    maxLength={50}
                    required
                />
                <Button type="submit" className="w-1/2 self-end">Add Job</Button>
            </form>
        </section>
    );
};