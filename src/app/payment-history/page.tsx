'use client';
import { useEffect } from 'react';
import { useGlobal } from '../context/globalContext';
import { usePayments } from '../context/paymentContext';
import moment from 'moment';
import Link from 'next/link';

export default function PaymentHistory() {
    const { setPageTitle } = useGlobal();
    const { sessionInfo } = usePayments();

    useEffect(() => {
        setPageTitle('Payment History');
    }, [setPageTitle]);

    return (
        <div className='flex flex-col p-4 w-full'>
            {sessionInfo.map((session, index) => (
                <Link href={`/payment-history/${session.sessionId}`} 
                    key={index} 
                    className='cursor-pointer flex justify-around border-l-4 border-cyan-700 p-2 rounded mb-4 shadow-md hover:-translate-y-2'
                >
                    <div className='font-semibold'>AED {session.totalSalary}</div>
                    <div className='text-sm text-gray-500'>Payment Processed on {moment(session.paymentDate).format("MMMM Do YYYY, h:mm a")}</div> 
                </Link>
            ))}
        </div>
    )
}