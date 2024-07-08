import { useState } from "react";
import type { Employee } from "../types";

type EmployeeSalaryRowProps = {
    employee: Employee;    
};

// TODO: Edit editable columns
export default function EmployeeSalaryRow(props: EmployeeSalaryRowProps) {
    const { employee } = props;
    console.log('employee in salary row', employee)
    const [salaryInfo, setSalaryInfo] = useState({additions: 0, deductions: 0, totalSalary: Number(employee.basicSalary) + Number(employee.salaryAllowances)})
    return (
            <div className="grid grid-cols-8 justify-items-center p-6">
                <div>{employee.staffId}</div>
                <div>{employee.name}</div> 
                <div>{employee.basicSalary}</div>
                <div>{employee.salaryAllowances}</div>
                <div>{salaryInfo.additions}</div>
                <div>{salaryInfo.deductions}</div>
                <div>{salaryInfo.totalSalary}</div>
                <div className="flex justify-around w-full">
                    <button className="underline">Edit</button>
                </div>
            </div>
    )
}