'use client'
import Link from 'next/link';
import { useGlobal } from "../context/globalContext";
import { useEffect, useState } from 'react';
import { dividerClasses } from '@mui/material';

type SideMenuItemProps = {
    label: string;
    route: string;
    iconPath?: string;
}

// TODO: icons
export default function SideMenuItem(props: SideMenuItemProps) {
    const {route, label, iconPath} = props;
    const { pageTitle } = useGlobal();
    const [isActive, setIsActive] = useState(pageTitle === label);

    useEffect(() => {
        setIsActive(pageTitle === label)
    }, [pageTitle, label]);

    return (
        <div className="p-2 text-center flex items-center">
            {iconPath &&
                <div className={`bg-url[${iconPath}`}></div>
            }
            <Link className={`${isActive ? 'text-[#ff220f]' : ''}`} href={route}>{label}</Link>
        </div>
    );
}