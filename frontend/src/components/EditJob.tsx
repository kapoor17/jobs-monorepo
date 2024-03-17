import React, { FormEvent, useEffect, useState } from 'react';
import api from '../services';
import { useNavigate, useParams } from 'react-router-dom';
import { InputField } from '../components';
import { Else, If, Then } from '../utils';
import { Job } from '../../../models/job';

interface Props {
    _id: string,
    company: string,
    position: string,
    setCompany: (data: string) => void,
    setPosition: (data: string) => void,
    setError: (data: string) => void,
}

export const EditJob: React.FC<Props> = ({ _id, company, position, setCompany, setPosition, setError }) => {

    const navigate = useNavigate();

    const handleSubmit = async (jobID: string, e: FormEvent) => {
        e.preventDefault();

        try{
            const {data} = await api.jobs.updateJob(jobID , {
                company,
                position
            })
            if(!!data.job) navigate('/dashboard');
        }catch(err){
            console.error(err);
            setError("Job could not be updated")
        }
    }

    return (
        <>
            <h1>Update Job</h1>
            <form className='flex gap-2 w-full mt-6 mb-10' onSubmit={(e) => handleSubmit(_id, e)}>
                <InputField 
                    label='Company' 
                    type='text'
                    value={company}
                    onChange={(company) => setCompany(company)}
                />
                <InputField 
                    label='Position' 
                    type='text'
                    value={position}
                    onChange={(position) => setPosition(position)}
                />
                <button type="submit" className="w-1/2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 self-end">Edit Job</button>
            </form>
        </>
    );
};