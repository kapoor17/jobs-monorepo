import React from 'react';
import { Job } from '../../../models/job';
import moment from 'moment';
import { Link } from 'react-router-dom';
import api from '../services';
import { Typography, showSuccessAlert } from '../utils';

interface IAllJobsTableProps {
    jobs: Job[]
}

export const AllJobsTable: React.FC<IAllJobsTableProps> = ({jobs}) => {

    const handleJobDelete = async (jobID: string) => {
        try{
            const data = await api.jobs.deleteJob(jobID);
            showSuccessAlert("Job deleted succesfully");
            window.location.reload();
        }catch(err: any){
            console.error(err);
            showSuccessAlert(`Job could not be deleted: ${err.message}`);
        }
    }
    
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption>
                <Typography element={'h3'} className='py-4 bg-white'>
                    All Jobs
                </Typography>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Position
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {jobs.map(job => {
                    return (
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {job.company}
                            </th>
                            <td className="px-6 py-4">
                                {job.position}
                            </td>
                            <td className="px-6 py-4">
                                {moment(job.createdAt).format('DD MMMM YYYY')}
                            </td>
                            <td className="px-6 py-4">
                                <Link to={`/edit/${job._id}`}  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                <button onClick={() => handleJobDelete(job._id)}  className="font-medium text-red-600 dark:text-red-500 hover:underline ml-4">Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
};