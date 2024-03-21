import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { ContainerSm } from './Layout';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, When } from '../utils';
import useAuthentication from '../hooks/useAuthentication';

export const Navbar: React.FC = () => {
    const [showDropdown, setDropdown] = useState(false);
    const profileDropdownRef = useRef<HTMLDivElement | null>(null);
    const isAuthenticated = useAuthentication();

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
                        <Typography element={'h2'}  className="self-center whitespace-nowrap dark:text-white">Folio: A Jobs API</Typography>
                    </Link>
                    <When condition={!!isAuthenticated}>
                        <div 
                            className="relative flex flex-col items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
                            onClick={() => setDropdown(prev => !prev)}
                            ref={profileDropdownRef}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 48 48" version="1.1">
                                <g id="🔍-System-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="ic_fluent_person_48_filled" fill="#212121" fill-rule="nonzero">
                                        <path d="M35.7502,28 C38.0276853,28 39.8876578,29.7909151 39.9950978,32.0427546 L40,32.2487 L40,33 C40,36.7555 38.0583,39.5669 35.0798,41.3802 C32.1509,43.1633 28.2139,44 24,44 C19.7861,44 15.8491,43.1633 12.9202,41.3802 C10.0319285,39.6218485 8.11862909,36.9249713 8.00532378,33.3388068 L8,33 L8,32.2489 C8,29.9703471 9.79294995,28.1122272 12.0440313,28.0048972 L12.2499,28 L35.7502,28 Z M24,4 C29.5228,4 34,8.47715 34,14 C34,19.5228 29.5228,24 24,24 C18.4772,24 14,19.5228 14,14 C14,8.47715 18.4772,4 24,4 Z" id="🎨-Color">
                                        </path>
                                    </g>
                                </g>
                            </svg>
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
                    </When>
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