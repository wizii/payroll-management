'use client';
import { useState, useEffect } from 'react';
import Table from '../components/table/table';
import { useEmployees } from '../context/employeesContext';
import { Employee, SalaryLog, SalaryLogInput } from '../types';
import Button from '../components/button';
import SalaryProcessingModal from '../components/salary-processing-modal';
import { useGlobal } from '../context/globalContext';
import Link from 'next/link';
import moment from 'moment';
import { usePayments } from '../context/paymentContext';

export default function Salaries() {
    const headers=['Staff Id', 'Name', 'Basic Salary (AED)', 'Salary Allowances (AED)', 'Additions (AED)', 'Deductions (AED)', 'Total Salary (AED)'];
    const editableFields = ['additions', 'deductions'];
    const dataFields = [{
      name: 'staffId',
      type: 'text'
    },{
      name: 'name',
      type: 'text'
    },{
      name: 'basicSalary',
      type: 'number'
    },{
      name: 'salaryAllowances',
      type: 'number'
    },{
      name: 'additions',
      type: 'number'
    },{
      name: 'deductions',
      type: 'number'
    },{
      name: 'totalSalary',
      type: 'number'
    }];
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setEmployees, selectedIds } = useEmployees();
    const { setPageTitle } = useGlobal();
    const { setSalaryLogs } = usePayments();

    useEffect(() => {
      setPageTitle('Salaries');
    }, [setPageTitle]);

    useEffect(() => {
        async function fetchEmployees() {
          try {
            const response = await fetch('/api/employees');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEmployees(data.employees);
          } catch (error) {
            console.log('error ocurred')
          }
        }
    
        fetchEmployees();
      }, [refreshTrigger]);

      async function saveChanges(item: Employee) {
        await fetch(`/api/salaries/${item.staffId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
          });
          refreshTable();
    }

    async function fetchSalaryLogs() {
      const response = await fetch(`/api/salaries/payment`);
      const data: { salaryLogs: SalaryLog[] } = await response.json();
      setSalaryLogs(data.salaryLogs);
    }

      function refreshTable() {
        setRefreshTrigger(refreshTrigger + 1);
      }

      async function handleSalaryProcessing(formData: FormData) {
        let salariesToProcess: SalaryLogInput[] = [];
        selectedIds.forEach(id => {
          let salaryMonthYear = formData.get(`${id}-salary-month-year`);
          if(salaryMonthYear) {
            salariesToProcess = [...salariesToProcess, {
              staffId: id,
              totalSalary: formData.get(`${id}-total-salary`) as string,
              salaryDate: salaryMonthYear as string,
              paymentDate: moment()
            }]
          }
        });
        const response = await fetch(`/api/salaries/payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(salariesToProcess)
        });

        setIsModalOpen(false); 
        fetchSalaryLogs();       
      }


    return (
      <div className="flex flex-col p-4 h-full">
        <SalaryProcessingModal handleSalaryProcessing={handleSalaryProcessing} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <div className="flex justify-end">
          <Link 
            href='/payment-history'
            className="text-center bg-white text-[#ff220f] border border-[#ff220f] hover:bg-[#ff220f] hover:text-white hover:border-transparent rounded px-2 py-4 lg:w-1/4 md:1/3 sm:w-1/2 self-end mb-4 hover:shadow-md mr-4 text-sm"
          >
            View Payment History
          </Link>
          <Button label='Process Salaries' onClick={() => setIsModalOpen(true)} isDisabled={selectedIds.length == 0}/>
        </div>
        
        <div className="flex-1">
          <Table 
            headers={headers}
            rowHeader={'staffId'}
            editableFields={editableFields} 
            saveChanges={saveChanges} 
            hasCheckBoxes={true} 
            dataFields={dataFields}    
          />
        </div> 
      </div>
    )
}