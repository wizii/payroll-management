'use client';
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import type { Employee } from '../types';

type EmployeeContextType = {
  employees: Employee[];
  setEmployees: Dispatch<SetStateAction<Employee[]>>;
  selectedIds: number[];
  setSelectedIds: Dispatch<SetStateAction<number[]>>;
};

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const useEmployees = (): EmployeeContextType => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider = ({ children, employeesData }: { children: ReactNode, employeesData: Employee[] }) => {
  const [employees, setEmployees] = useState<Employee[]>(employeesData);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, selectedIds, setSelectedIds }}>
      {children}
    </EmployeeContext.Provider>
  );
};
