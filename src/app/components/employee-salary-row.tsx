import { useState } from "react";
import type { Employee } from "../types";
import RowItem from "./row-item";

type EmployeeSalaryRowProps = {
    employee: Employee;
    saveChanges: () => void;
};

// TODO: Edit editable columns
export default function EmployeeSalaryRow(props: EmployeeSalaryRowProps) {
    const fields = [{
        name: 'staffId',
        isEditable: false

    }, {
        name: 'name',
        isEditable: false

    }, {
        name: 'basicSalary',
        isEditable: false

    }, {
        name: 'salaryAllowances',
        isEditable: false

    }, {
        name: 'additions',
        isEditable: true

    }, {
        name: 'deductions',
        isEditable: true

    },
    {
        name: 'totalSalary',
        isEditable: false

    }];

    const { employee, saveChanges } = props;
    console.log('employee in salary row', employee)
    const [salaryInfo, setSalaryInfo] = useState({additions: 0, deductions: 0, totalSalary: Number(employee.basicSalary) + Number(employee.salaryAllowances)})
    const [isEditing, setIsEditing] = useState(false);
    return (
                <>
                {fields.map((field, index) => <RowItem key={index} value={employee[field.name]} isEditable={field.isEditable} isEditing={isEditing}/>)}
                <div className="flex justify-around w-full">
                    {isEditing ?
                        <button className="underline" onClick={() => {setIsEditing(false); saveChanges();}}>Save</button>
                        :
                        <button className="underline" onClick={() => setIsEditing(true)}>Edit</button>
                        
                    }                  
                </div>
                </>
    )
}