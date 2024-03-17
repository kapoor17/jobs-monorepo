import React, { useEffect, useState } from 'react';
import api from '../services';
import { Job } from '../../../models/job';
import { AddJobs, AllJobsTable } from '../components';
import { Else, If, Then, showErrorAlert } from '../utils';

interface State {
    jobs: Job[],
}

export const Dashboard: React.FC = () => {
    const [state, setUseState] = useState<State>({
        jobs: []
    })
    const setState = (data: Partial<State>) => setUseState(State => Object.assign({}, State, data));

    const onLoad = async () => {
        try{
            const {data} = await api.jobs.getAllJobs();
            setState({jobs: data.jobs})
        }catch(err: any){
            console.error(err);
            showErrorAlert(`Could not fetch jobs: ${err.message}`)
        }
    }

    useEffect(() => {
        onLoad();
    }, [])

    return (
        <div>
            <AddJobs setJobs={(job) => setState({jobs: [...state.jobs, job]})}/>
            <If condition={!!state.jobs.length}>
                <Then>
                    <AllJobsTable jobs={state.jobs}/>
                </Then>
                <Else>
                    <p>No jobs available for you right now!</p>
                </Else>
            </If>
        </div>
    );
};