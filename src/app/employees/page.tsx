'use client';

import { useEffect, useState } from "react";
import AddEmployeeModal from "../components/add-employee-modal";
import { useEmployees } from "../context/employeesContext";
import Table from "../components/table/table";
import { Employee } from "../types";

// TODO: Scrollable-table
// TODO: Delete employee
// Make staff id auto generated?
// TODO: Handle empty state
export default function Employees() {
    const headers = ['Staff Id', 'Name', 'Joining Date', 'Basic Salary', 'Salary Allowances'];
    const editableFields = ['name', 'joiningDate', 'basicSalary', 'salaryAllowances']
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { employees, setEmployees } = useEmployees();
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    
    // TODO: loading state
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
        const response = await fetch(`/api/employees/${item.staffId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
          });
          refreshTable();
          // TODO: notification if unsuccessful
    }

      function refreshTable() {
        setRefreshTrigger(refreshTrigger + 1);
      }

    async function addEmployee(formData: FormData) {
        let employeeData = {
            name: formData.get('employee-name'),
            joiningDate: formData.get('joining-date'),
            basicSalary: formData.get('basic-salary'),
            salaryAllowances: formData.get('salary-allowances')
        }
    
        const response = await fetch('/api/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData)
          });
    
        setIsModalOpen(false);
        if(response.status == 201) {
          refreshTable();
        }
    }

    function deleteEmployee(id: string) {
        console.log('deleting employee with id', id)
    }
    
    return (
        <div className="flex flex-col">
            <div className="flex justify-end text-[#ff220f]">
                <button onClick={() => setIsModalOpen(true)}> + Add Employee</button>
            </div>
            <Table headers={headers} content={employees} rowHeader={'staffId'} editableFields={editableFields} refreshTable={refreshTable} saveChanges={saveChanges}></Table>
            {isModalOpen &&
                <AddEmployeeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} addEmployee={addEmployee}></AddEmployeeModal>
            }
        </div>
    )
}