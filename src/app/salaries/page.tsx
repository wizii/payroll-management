'use client';
import { useState, useEffect } from "react";
import Table from "../components/table/table";
import { useEmployees } from "../context/employeesContext";
import { Employee } from "../types";
import Button from "../components/button";
import SalaryProcessingModal from "../components/salary-processing-modal";

// TODO: Add salary currency
// TODO: Add payment status?
// TODO: Add checkboxes for salary rows
// TODO: Create processing modal
// TODO: Don't save if no changes
export default function Salaries() {
    const headers=['Staff Id', 'Name', 'Basic Salary', 'Salary Allowances', 'Additions', 'Deductions', 'Total Salary'];
    const editableFields = ['additions', 'deductions'];
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { employees, setEmployees } = useEmployees();

    useEffect(() => {
        async function fetchEmployees() {
          try {
            const response = await fetch('/api/employees');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            setEmployees(data.employees);
            // setLoading(false);
            // console.log(typeof employees[0].joiningDate)
          } catch (error) {
            // setError(error);
            // setLoading(false);
            console.log('error ocurred')
          }
        }
    
        fetchEmployees();
      }, [refreshTrigger]);

      async function saveChanges(item: Employee) {
        console.log('salary info item', item)
        const response = await fetch(`/api/salaries/${item.staffId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
          });
          refreshTable();
          console.log(response)
          // TODO: notification if unsuccessful
    }

      function refreshTable() {
        setRefreshTrigger(refreshTrigger + 1);
      }

      function handleSalaryProcessing(formData: FormData) {
        console.log('handling processing for employees with these ids');
      }


    return (
      <div className="flex flex-col p-4 h-full">
        <SalaryProcessingModal handleSalaryProcessing={handleSalaryProcessing} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        <Button label='Process Salaries' onClick={() => setIsModalOpen(true)}/>
        <div className="flex-1">
          <Table 
            headers={headers}
            content={employees} 
            rowHeader={'staffId'}
            editableFields={editableFields}
            refreshTable={refreshTable}
            saveChanges={saveChanges} 
            hasCheckBoxes={true}          
          />
        </div> 
      </div>
    )
}