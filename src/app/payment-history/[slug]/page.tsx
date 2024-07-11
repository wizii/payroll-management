'use client'
import { usePayments } from '@/app/context/paymentContext';
import Link from 'next/link';
import moment from 'moment';

export default function PaymentDetails({ params }: { params: { slug: string } }) {
    const { salaryLogs, sessionInfo } = usePayments(); 
    const sessionLogs = salaryLogs.filter(log => log.sessionId === params.slug)
    const session = sessionInfo.find(info => info.sessionId == params.slug)
    return (
        <div className='flex flex-col w-full p-4'>
            <Link 
                href='/payment-history'
                className="text-center bg-white text-[#ff220f] border border-[#ff220f] hover:bg-[#ff220f] hover:text-white hover:border-transparent rounded px-2 py-4 w-1/5 self-end mb-4 hover:shadow-md mr-4"
            >
            Back to Payment History
          </Link>
            <div className='flex w-full rounded shadow-lg p-4'>
                <div className='flex flex-col flex-1'>
                    <div className='mb-2'><span className='text-gray-500 font-medium'>Total Amount Paid: </span>AED {session?.totalSalary}</div>
                    <div><div className='text-gray-500 font-medium'>Employees Paid:</div></div>
                    {sessionLogs.map(log => (
                        <div key={log.staffId} className='flex w-4/6 justify-around p-2'>
                            <div className='text-sm'><span className='text-gray-500 font-medium'>Staff Id: </span>{log.staffId}</div>
                            <div className='text-sm'><span className='text-gray-500 font-medium'>Total Salary Paid: </span>AED {log.totalSalary}</div>
                            <div className='text-sm'><span className='text-gray-500 font-medium'>Salary Month/Year: </span>{log.salaryDate}</div>
                        </div>
                     ))}
                </div>
                <div className='text-sm text-gray-500'>Payment Processed on {moment(session?.paymentDate).format("MMMM Do YYYY, h:mm a")}</div>
            </div>


        </div>
    )
  }