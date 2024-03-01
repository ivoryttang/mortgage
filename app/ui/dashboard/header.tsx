"use client"
import React from 'react';
import Link from 'next/link';
import Logo from '../acme-logo';
import { UserIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => setShowDropdown(!showDropdown);
    
    return (
        <header style={{ borderBottom: '1px solid gray', backgroundColor: 'white', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000, width: '100%', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link
        className="flex items-end justify-start rounded-md "
        href="/"
      >
          <Logo />
      </Link>
        <div className="dropdown">
                <button onClick={toggleDropdown} className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className='flex'><UserIcon className="mr-1 mt-1 " style={{width: '20px',height:'20px'}}/>Guest<ChevronDownIcon className="mt-1 ml-3" style={{width: '20px',height:'20px'}}/></div>
                </button>
                
            </div>
        </header>
        
    );
}

export default Header;