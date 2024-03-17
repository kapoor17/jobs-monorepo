import React, { FormEvent, useEffect, useState } from 'react';
import api from '../services';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EditJob } from '../components';
import { Else, If, Then } from '../utils';
import { Job } from '../../../models/job';
import Button from '../components/Button';

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
                <div className='flex flex-col items-start'>
                    <Button className='w-fit'>
                        <Link className='w-full block' to="/dashboard">
                            Go Back
                        </Link>
                    </Button>
                    <EditJob 
                        _id={_id} 
                        company={state.company}
                        position={state.position}
                        setCompany={company => setState({company})}
                        setPosition={position => setState({position})}
                        setError={error => setState({error})}
                    />
                </div>
            </Then>
            <Else>
                {state.error}
            </Else>
        </If>
    );
};