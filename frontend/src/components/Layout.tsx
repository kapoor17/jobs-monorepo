import React from 'react';
import { Navbar } from './';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
    return (
        <div className='h-screen flex flex-col'>
            <Navbar/>
            <section className="bg-gray-50 dark:bg-gray-900 flex-grow py-6">
                <ContainerSm>
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