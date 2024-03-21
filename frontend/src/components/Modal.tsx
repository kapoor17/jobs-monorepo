import React from 'react';

interface IModalProps {
    children: React.ReactNode
}

export const Modal: React.FC<IModalProps> = ({
    children
}) => {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 p-6 space-y-4 md:space-y-6 sm:p-8">
                {children}
            </div>
        </div>
    );
};