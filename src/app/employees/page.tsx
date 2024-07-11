'use client';
import { useEffect, useState } from 'react';
import AddEmployeeModal from '../components/add-employee-modal';
import { useEmployees } from '../context/employeesContext';
import Table from '../components/table/table';
import { Employee } from '../types';
import Button from '../components/button';
import { useGlobal } from '../context/globalContext';
import DeleteDialog from '../components/delete-dialog';

export default function Employees() {
    const headers = ['Staff Id', 'Name', 'Joining Date', 'Basic Salary (AED)', 'Salary Allowances (AED)'];
    const dataFields = [{
      name: 'staffId',
      type: 'text'
    },{
      name: 'name',
      type: 'text'
    },{
      name: 'joiningDate',
      type: 'date'
    },{
      name: 'basicSalary',
      type: 'number'
    },{
      name: 'salaryAllowances',
      type: 'number'
    }];
    const editableFields = ['name', 'joiningDate', 'basicSalary', 'salaryAllowances']
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState<string | null>(null);
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

    function handleDelete(id: string) {
      setEmployeeIdToDelete(id);
      setIsDeleteDialogOpen(true);
    }

    async function deleteEmployee() {
      const response = await fetch(`/api/employees/${employeeIdToDelete}`, {
        method: 'DELETE'
      });
      setIsDeleteDialogOpen(false);
      if(response.status == 201) {
        refreshTable();
      }
      setEmployeeIdToDelete(null);
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
              saveChanges={saveChanges}
              handleDelete={handleDelete}
              dataFields={dataFields}
            />
            {isModalOpen &&
                <AddEmployeeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} addEmployee={addEmployee}></AddEmployeeModal>
            }
            {isDeleteDialogOpen && employeeIdToDelete &&
              <DeleteDialog isDialogOpen={isDeleteDialogOpen} setIsDialogOpen={setIsDeleteDialogOpen} employeeId={employeeIdToDelete} handleDelete={deleteEmployee}/>
            }
        </div>
    )
}