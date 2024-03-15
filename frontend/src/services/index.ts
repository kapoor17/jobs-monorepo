import {Job} from '../../../models/job'
import {AuthenticationResponse, User} from '../../../models/user'
import axios, { AxiosPromise } from 'axios';

const headers = (json = true, additionalHeaders = {}, additionalConfig = {}) => {
    return {
        headers: Object.assign(
            json ? {"Content-Type": "application/json"} : {},
            additionalHeaders
        ),
        ...additionalConfig
    }
}

axios.defaults.baseURL = "http://localhost:4001/api/v1"
const api = {
    auth: {
        register: (userDetails: User): AxiosPromise<AuthenticationResponse> => {
            return axios.post('/auth/register', userDetails, headers())
        },
        login: (userCredentials: Omit<User, '_id' | 'name'>): AxiosPromise<AuthenticationResponse> => {
            return axios.post('/auth/login', userCredentials, headers())
        }
    },
    jobs: {
        getAllJobs: (): AxiosPromise<{
            jobs: Job[],
            count: number
        }> => {
            return axios.get('/jobs', headers())
        },
        createJob: (jobDetails: Partial<Job>): AxiosPromise<Job> => {
            return axios.post('/jobs', jobDetails, headers());
        },
        getJob: (jobID: Pick<Job, "_id">): AxiosPromise<Job> => {
            return axios.get(`/jobs/${jobID}`, headers());
        },
        updateJob: (jobID: Pick<Job, "_id">, jobDetails: Partial<Job>): AxiosPromise<Job> => {
            return axios.patch(`/${jobID}`, jobDetails, headers());
        },
        deleteJob: (jobID: Pick<Job, "_id">): AxiosPromise<Job> => {
            return axios.delete(`/${jobID}`, headers())
        }
    }
}

axios.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem('token');
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;