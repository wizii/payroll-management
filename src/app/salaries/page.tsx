'use client';
import { useState, useEffect } from "react";
import Table from "../components/table/table";
import { useEmployees } from "../context/employeesContext";
import { Employee } from "../types";

// TODO: Add salary currency
// TODO: Add payment status?
export default function Salaries() {
    const headers=['Staff Id', 'Name', 'Basic Salary', 'Salary Allowances', 'Additions', 'Deductions', 'Total Salary', ''];
    const editableFields = ['additions', 'deductions'];
    const [refreshTrigger, setRefreshTrigger] = useState(0);
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

    return (
        <Table headers={headers} content={employees} rowHeader={'staffId'} editableFields={editableFields} refreshTable={refreshTable} saveChanges={saveChanges}></Table>
    )
}