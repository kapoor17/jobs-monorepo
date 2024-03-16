import React from 'react';
import { ContainerSm } from './Layout';

const NavigationItems = [
    {
        name: 'Profile'
    }
]
export const Navbar: React.FC = () => {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <ContainerSm>
                <div className="flex flex-wrap items-center justify-between py-4">
                    <a  className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Folio: A Jobs API</span>
                    </a>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button 
                            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" 
                            type="button" 
                            id="user-menu-button" 
                            aria-expanded="false" 
                            data-dropdown-toggle="user-dropdown" 
                            data-dropdown-placement="bottom"
                        >
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"/>
                        </button>
                    </div>
                </div>
            </ContainerSm>
        </nav>
    );
};