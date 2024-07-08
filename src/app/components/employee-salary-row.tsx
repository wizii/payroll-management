import { useEffect, useState } from "react";
import type { Employee } from "../types";
import RowItem from "./row-item";

type EmployeeSalaryRowProps = {
    employee: Employee;
    saveChanges: () => void;
};

type salaryModifications = {
    additions: number;
    deductions: number;
};
  

// TODO: Save additions, deductions
export default function EmployeeSalaryRow(props: EmployeeSalaryRowProps) {
    const { employee, saveChanges } = props;
    console.log('employee in salary row', employee);
    const employeeFields = ['staffId', 'name', 'basicSalary', 'salaryAllowances'];
    const [salaryModifications, setSalaryModifications] = useState<salaryModifications>({additions: 0, deductions: 0})
    const [totalSalary, setTotalSalary] = useState(Number(employee.basicSalary) + Number(employee.salaryAllowances))
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setTotalSalary(Number(employee.basicSalary) + Number(employee.salaryAllowances) + Number(salaryModifications.additions) - Number(salaryModifications.deductions))
    }, [salaryModifications, employee.basicSalary, employee.salaryAllowances])

    function handleChange(value: string, name: string) {
        console.log(value)
        setSalaryModifications({
        ...salaryModifications,
        [name]: value,
       });
    };

    return (
                <>
                {employeeFields.map((field, index) => <RowItem key={index} value={employee[field as keyof Employee]} isEditable={false} isEditing={isEditing}/>)}
                {Object.keys(salaryModifications).map((key, index) => 
                    <RowItem 
                        key={index}
                        name={key}
                        value={salaryModifications[key as keyof salaryModifications]}
                        isEditable={true}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                )}
                <RowItem name='totalSalary' isEditable={false} isEditing={isEditing} value={totalSalary}></RowItem>
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