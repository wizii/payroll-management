'use client';

import EmployeeSalaryRow from "../components/employee-salary-row";
import { useEmployees } from "../context/employeesContext";

// TODO: Change salary currencys
export default function Salaries() {
    const headers=['Staff Id', 'Name', 'Basic Salary', 'Salary Allowances', 'Additions', 'Deductions', 'Total Salary'];
    const { employees } = useEmployees();

    function saveChanges() {
        console.log('saving changes')
    }

    return (
        <div className="flex flex-col">
            <div className={`grid grid-cols-7 p-6 bg-[#f1f7ff]/50 text-gray-500`}>
                {headers.map((header, index) => 
                    <div key={index}>{header}</div>
                )}
            </div>
            <div className="grid grid-cols-8 justify-items-center p-6 gap-x-2">
                {employees.map((employee, index) => 
                    <EmployeeSalaryRow key={index} employee={employee} saveChanges={saveChanges}></EmployeeSalaryRow>
                )}
            </div>
        </div>
    )
}