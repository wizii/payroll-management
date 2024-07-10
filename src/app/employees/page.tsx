'use client';
import { useEffect, useState } from "react";
import AddEmployeeModal from "../components/add-employee-modal";
import { useEmployees } from "../context/employeesContext";
import Table from "../components/table/table";
import { Employee } from "../types";
import Button from "../components/button";
import { useGlobal } from "../context/globalContext";

// TODO: Scrollable-table
// TODO: Handle empty state
export default function Employees() {
    const headers = ['Staff Id', 'Name', 'Joining Date', 'Basic Salary', 'Salary Allowances'];
    const editableFields = ['name', 'joiningDate', 'basicSalary', 'salaryAllowances']
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setEmployees } = useEmployees();
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { setPageTitle } = useGlobal();

    useEffect(() => {
      setPageTitle('Employees');
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

    // TODO: Add delete warning
    async function deleteEmployee(id: string) { 
      const response = await fetch(`/api/employees/${id}`, {
        method: 'DELETE'
      });
      if(response.status == 201) {
        refreshTable();
      }
      // TODO: notification if failed
    }
    
    return (
          <div className="flex flex-col p-4 h-full">
            <div className="flex justify-end text-[#ff220f]">
              <Button onClick={() => setIsModalOpen(true)} label='Add Employee'/>
            </div>
            <Table 
              headers={headers}
              rowHeader={'staffId'}
              editableFields={editableFields}
              refreshTable={refreshTable}
              saveChanges={saveChanges}
              handleDelete={deleteEmployee}
            />
            {isModalOpen &&
                <AddEmployeeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} addEmployee={addEmployee}></AddEmployeeModal>
            }
        </div>
    )
}