import React from 'react';
import { Job } from '../../../models/job';
import moment from 'moment';

interface IAllJobsTableProps {
    jobs: Job[]
}

export const AllJobsTable: React.FC<IAllJobsTableProps> = ({jobs}) => {
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
};