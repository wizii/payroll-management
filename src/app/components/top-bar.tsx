'use client';
import Image from 'next/image';
import { useGlobal } from '../context/globalContext';

export default function TopBar() { 
    const { pageTitle } = useGlobal();

    return (
        <div className="flex h-16 w-full">
            <div className="self-center flex-1 font-bold">{pageTitle}</div>
            <Image src='/logo.svg' width={200} height={70} alt='Logo'></Image>
        </div>
    )
}