'use client';

import { useEffect, useState } from "react";
import AddEmployeeModal from "../components/add-employee-modal";

export default function Employees() {
    const headers = ['Staff Id', 'Name', 'Joining Date', 'Basic Salary', 'Salary Allowances'];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [employeeCount, setEmployeeCount] = useState(employees.length);

    // TODO: dependency array
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
            // console.log(employees)
          } catch (error) {
            // setError(error);
            // setLoading(false);
            console.log('error occured')
          }
        }
    
        fetchEmployees();
      }, [employeeCount]);

    async function addEmployee(formData: FormData) {
        let employeeData = {
            staffId: formData.get('staff-id'),
            employeeName: formData.get('employee-name'),
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
            setEmployeeCount(employeeCount + 1);
        }

          console.log('add employee response', response)

    }

    function deleteEmployee(id: string) {
        console.log('deleting employee with id', id)
    }
    
    return (
        <div className="flex flex-col">
            <div className="flex justify-end text-[#ff220f]">
                <button onClick={() => setIsModalOpen(true)}> + Add Employee</button>
            </div>
            <div className='grid grid-cols-6 p-6 bg-[#f1f7ff]/50 text-gray-500 justify-items-center'>
                {headers.map((header, index) => 
                    <div key={index}>{header}</div>
                )}
            </div>
            {employees.map((employee, index) => { 
                    console.log('employee', employee)
                    return (
                    <div key={index} className="grid grid-cols-6 justify-items-center p-6">
                        <div>{employee.staffid}</div>
                        <div>{employee.name}</div>
                        <div>{employee.joiningdate}</div>
                        <div>{employee.basicsalary}</div>
                        <div>{employee.salaryallowances}</div>
                        <div className="flex justify-around w-full">
                            <button className="underline">Edit</button>
                            <button onClick={() => deleteEmployee(employee.staffid)} className="underline">Delete</button>
                        </div>
                    </div>
            )})}
            {isModalOpen &&
                <AddEmployeeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} addEmployee={addEmployee}></AddEmployeeModal>
            }
            
        </div>
    )
}