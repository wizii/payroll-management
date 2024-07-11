'use client';
import { useState, useEffect } from "react";
import Table from "../components/table/table";
import { useEmployees } from "../context/employeesContext";
import { Employee } from "../types";
import Button from "../components/button";
import SalaryProcessingModal from "../components/salary-processing-modal";
import { useGlobal } from "../context/globalContext";
import Link from "next/link";

// TODO: Add salary currency
// TODO: Add payment status?
// TODO: Don't save if no changes
export default function Salaries() {
    const headers=['Staff Id', 'Name', 'Basic Salary', 'Salary Allowances', 'Additions', 'Deductions', 'Total Salary'];
    const editableFields = ['additions', 'deductions'];
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setEmployees, selectedIds, setSelectedIds } = useEmployees();
    const { setPageTitle } = useGlobal();

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
        console.log('salary info item', item)
        await fetch(`/api/salaries/${item.staffId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
          });
          refreshTable();
    }

      function refreshTable() {
        setRefreshTrigger(refreshTrigger + 1);
      }

      async function handleSalaryProcessing(formData: FormData) {
        let salariesToProcess = [];
        selectedIds.forEach(id => {
          let salaryMonthYear = formData.get(`${id}-salary-month-year`);
          if(salaryMonthYear) {
            salariesToProcess = [...salariesToProcess, {
              staffId: id,
              totalSalary: formData.get(`${id}-total-salary`),
              salaryDate: salaryMonthYear
            }]
          }
        });
        console.log('handling processing for employees with these ids', salariesToProcess);
        const response = await fetch(`/api/salaries/payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(salariesToProcess)
        });
        console.log('response', response)
        setIsModalOpen(false);
        
      }


    return (
      <div className="flex flex-col p-4 h-full">
        <SalaryProcessingModal handleSalaryProcessing={handleSalaryProcessing} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <div className="flex justify-end">
          <Link 
            href='/payment-history'
            className="text-center bg-white text-[#ff220f] border border-[#ff220f] hover:bg-[#ff220f] hover:text-white hover:border-transparent rounded px-2 py-4 w-1/5 self-end mb-4 hover:shadow-md mr-4"
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
          />
        </div> 
      </div>
    )
}