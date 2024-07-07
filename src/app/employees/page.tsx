'use client';

import { useState } from "react";
import AddEmployeeModal from "../components/add-employee-modal";
import Table from "../components/table";

export default function Employees() {
    const headers = ['Staff Id', 'Name', 'Joining Date', 'Basic Salary', 'Salary Allowances'];
    const [isModalOpen, setIsModalOpen] = useState(false);

    function addEmployee(formData: FormData) {
        let employeeDate = {
            staffId: formData.get('staff-id'),
            employeeName: formData.get('employee-name'),
        }

    }
    
    return (
        <div className="flex flex-col">
            <div className="flex justify-end text-[#ff220f]">
                <button onClick={() => setIsModalOpen(true)}> + Add Employee</button>
            </div>
            <div className={`grid grid-cols-5 p-6 bg-[#f1f7ff]/50 text-gray-500 justify-items-center`}>
                {headers.map((header, index) => 
                    <div key={index}>{header}</div>
                )}
            </div>
            {isModalOpen &&
                <AddEmployeeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} addEmployee={addEmployee}></AddEmployeeModal>
            }
            
        </div>
    )
}