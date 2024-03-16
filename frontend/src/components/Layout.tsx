import React from 'react';
import { Navbar } from './';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
    return (
        <div className='h-screen flex flex-col'>
            <Navbar/>
            <section className="bg-gray-50 dark:bg-gray-900 flex-grow">
                <Outlet/>
            </section>
        </div>
    );
};