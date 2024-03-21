import React, { FormEvent, useEffect, useState } from 'react';
import api from '../services';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EditJob, Button } from '../components';
import { Else, If, Then, Typography, showErrorAlert } from '../utils';
import { Job } from '../../../models/job';

interface State {
    company: string,
    position: string ,
    error: string | null
}

export const EditPage: React.FC = () => {
    const [state, setUseState] = useState<State>({
        company: '',
        position: '',
        error: ''
    });

    const setState = (data: Partial<State>) => setUseState(State => Object.assign({}, State, data));

    const params = useParams();
    const _id = params._id as string;

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
        }catch(err: any){
            console.error(err);
            setState({error : "Job Id invalid"})
            showErrorAlert(`Could not fetch job: ${err.message}`)
        }
    }

    useEffect(() => {
        onLoad(_id);
    }, [])

    return (
        <If condition={!state.error}>
            <Then>
                <main className='flex flex-col items-start gap-4'>
                    <Link className='w-fit block' to="/dashboard">
                        <Button className='w-fit'>
                            Go Back
                        </Button>
                    </Link>
                    <EditJob 
                        _id={_id} 
                        company={state.company}
                        position={state.position}
                        setCompany={company => setState({company})}
                        setPosition={position => setState({position})}
                        setError={error => setState({error})}
                    />
                </main>
            </Then>
            <Else>
                <Typography element={'p'}>
                    {state.error}
                </Typography>
            </Else>
        </If>
    );
};