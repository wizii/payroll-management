'use client';
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import type { SalaryLog, SessionInfo } from '../types';

type PaymentContextType = {
  salaryLogs: SalaryLog[];
  setSalaryLogs: Dispatch<SetStateAction<SalaryLog[]>>;
  sessionInfo: SessionInfo[];
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayments = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayments must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children, paymentsData }: { children: ReactNode, paymentsData: SalaryLog[] }) => {
  const [salaryLogs, setSalaryLogs] = useState<SalaryLog[]>(paymentsData);
  const [sessionInfo, setSessionInfo] = useState<SessionInfo[]>([]);

  useEffect(() => {
    setSessionInfo(calculateSessionInfo());
  }, [salaryLogs]);

  function calculateSessionInfo(): SessionInfo[] {
    const groupedLogs = salaryLogs.reduce((acc: { [key: string]: SalaryLog[] }, item: SalaryLog) => {
      const { sessionId } = item;
      if (!acc[sessionId]) {
        acc[sessionId] = [];
      }
      acc[sessionId].push(item);
      return acc;
    }, {});

    return Object.keys(groupedLogs).map(sessionId => {
      const logs = groupedLogs[sessionId];
      const totalSalarySum = logs.reduce((sum, log) => sum + Number(log.totalSalary), 0);
      const paymentDate = logs[0].paymentDate;

      return {
        sessionId,
        totalSalary: totalSalarySum,
        paymentDate
      };
    });
  }

  return (
    <PaymentContext.Provider value={{ salaryLogs, setSalaryLogs, sessionInfo }}>
      {children}
    </PaymentContext.Provider>
  );
};
