import React, { FormEvent, useEffect, useState } from 'react';
import api from '../services';
import { useNavigate, useParams } from 'react-router-dom';
import { InputField, Button } from '../components';
import { Else, If, Then, Typography, showErrorAlert } from '../utils';
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
            navigate('/dashboard');
        }catch(err: any){
            console.error(err);
            showErrorAlert(`Job could not be updated: ${err.message}`)
        }
    }

    return (
        <section className='w-full'>
            <Typography element={'h3'}>Update Job</Typography>
            <form className='flex gap-2 w-full mt-6 mb-10' onSubmit={(e) => handleSubmit(_id, e)}>
                <InputField 
                    label='Company' 
                    type='text'
                    value={company}
                    onChange={(company) => setCompany(company)}
                    minLength={5}
                    maxLength={50}
                    required
                />
                <InputField 
                    label='Position' 
                    type='text'
                    value={position}
                    onChange={(position) => setPosition(position)}
                    minLength={5}
                    maxLength={50}
                    required
                />
                <Button type='submit' className='self-end w-1/2'>Edit Job</Button>
            </form>
        </section>
    );
};