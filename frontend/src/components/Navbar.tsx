import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { ContainerSm } from './Layout';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { When } from '../utils';

export const Navbar: React.FC = () => {
    const [showDropdown, setDropdown] = useState(false);
    const profileDropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const hideDropdown = (e: any) => {
            if(profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)){
                setDropdown(false);
            }
        }

        document.addEventListener('mousedown', hideDropdown);

        return () => document.removeEventListener("mousedown", hideDropdown);
    }, [])

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <ContainerSm>
                <div className="flex flex-wrap items-center justify-between py-4">
                    <Link to="/dashboard"  className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Folio: A Jobs API</span>
                    </Link>
                    <div 
                        className="relative flex flex-col items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
                        onClick={() => setDropdown(prev => !prev)}
                        ref={profileDropdownRef}
                    >
                        <button 
                            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" 
                        >
                            <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"/>
                        </button>
                        <When condition={showDropdown}>
                            <ProfileDropdown>
                                <Link 
                                    to={'/login'}
                                    onClick={() => localStorage.removeItem('token')}
                                    id="user-menu-button"
                                >
                                    Logout
                                </Link>
                            </ProfileDropdown>
                        </When>
                    </div>
                </div>
            </ContainerSm>
        </nav>
    );
};

const ProfileDropdown = styled.div`
    padding: 1em 2em;
    position: absolute;
    top: 125%;
    background: red;
    border-radius: 10px;
    background: white;
    box-shadow: 1px 1px 19px 1px #00000026;

    &::after{
        content: "";
        width: 10px;
        height: 10px;
        display: block;
        background: white;
        position: absolute;
        transform: rotate(45deg);
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
    }
`