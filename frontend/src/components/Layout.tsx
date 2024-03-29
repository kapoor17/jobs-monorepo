import React from 'react';
import { Navbar } from './';
import { Outlet, useLoaderData, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export const Layout: React.FC = () => {
    const location = useLocation();
    return (
        <div className='h-screen flex flex-col'>
            <ToastContainer/>
            <Navbar key={location.pathname}/>
            <section className="bg-gray-50 dark:bg-gray-900 flex-grow pt-6 pb-12">
                <ContainerSm className='h-full'>
                    <Outlet/>
                </ContainerSm>
            </section>
        </div>
    );
};

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const ContainerSm: React.FC<ContainerProps> = ({children, className}) => {
  return (
    <div className={`max-w-6xl w-full mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
};

export const ContainerFull: React.FC<ContainerProps> = ({children, className}) => {
  return (
    <div className={`container mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
};