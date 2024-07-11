'use client'
import { useEffect, useState } from 'react';
import { useGlobal } from './context/globalContext';
import Link from 'next/link';
import moment from 'moment';
import { usePayments } from './context/paymentContext';

// TODO: Check responsiveness
// TODO: linting/consoles
// TODO: type dispatches
export default function Dashboard() {
  const { setPageTitle } = useGlobal();
  const {sessionInfo} = usePayments();
  
  useEffect(() => {
    setPageTitle('Dashboard');
  }, [setPageTitle]);

  return (
      <div className='flex py-4 w-full'>
        <div className='flex flex-col w-1/3 rounded shadow-lg p-4'>
          <div className='pb-2 border-b border-slate-300 text-sm font-semibold mb-4'>Payment History</div>
            {sessionInfo.slice(0,2).map((session, index) => (
              <div key={index} className='flex flex-col border-l-4 border-cyan-700 px-2 rounded mb-2'>
                <div key={index}>AED {session.totalSalary}</div>
                <div className='text-sm text-gray-500'>Payment Processed on {moment(session.paymentDate).format("MMMM Do YYYY, h:mm a")}</div>  
              </div>
            ))}
            <div className='flex justify-end w-full mt-4'>
              <Link 
                href='/payment-history'
                className="text-center bg-white text-[#ff220f] border border-[#ff220f] hover:bg-[#ff220f] hover:text-white hover:border-transparent rounded px-2 py-2 w-1/5 self-end mb-4 hover:shadow-md mr-4"
              >
              View All
              </Link>
            </div>
        </div>
      </div>
  );
};
