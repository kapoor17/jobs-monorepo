import React, { useEffect, useState } from 'react';
import api from '../services';
import { Job } from '../../../models/job';
import { AddJobs, AllJobsTable } from '../components';

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
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        onLoad();
    }, [])

    return (
        <div>
            <AddJobs setJobs={(jobs) => setState({jobs})}/>
            <AllJobsTable jobs={state.jobs}/>
        </div>
    );
};