'use client'
import Link from 'next/link';
import { useGlobal } from "../context/globalContext";
import { useEffect, useState } from 'react';

type SideMenuItemProps = {
    label: string;
    route: string;
}

// TODO: icons
export default function SideMenuItem(props: SideMenuItemProps) {
    const {route, label} = props;
    const { pageTitle } = useGlobal();
    const [isActive, setIsActive] = useState(pageTitle === label);

    useEffect(() => {
        setIsActive(pageTitle === label)
    }, [pageTitle, label]);

    return (
        <div className="p-2 text-center">
            <Link className={`${isActive ? 'text-[#ff220f]' : ''}`} href={route}>{label}</Link>
        </div>
    );
}