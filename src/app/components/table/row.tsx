import { useState } from "react";
import RowItem from "./row-item";
import { Employee } from "@/app/types";

type RowProps = {
    rowHeader: string;
    dataFields: string[];
    item: Employee;
    editableFields: string[];
    saveChanges: (item: Employee) => void;
    canDelete?: boolean;
    handleDelete?: (id: string) => void;
}

export default function Row(props: RowProps) {
    const { rowHeader, item, dataFields, editableFields, saveChanges, canDelete, handleDelete } = props;
    const [isEditing, setIsEditing]= useState(false);
    const calculateTotalSalary = (item: Employee) => {
        return (
          Number(item.basicSalary) +
          Number(item.salaryAllowances) +
          Number(item.additions) -
          Number(item.deductions)
        );
      };
    const initialTotalSalary = calculateTotalSalary(item);
    const [rowItem, setRowItem] = useState({...item, totalSalary: initialTotalSalary });



    function handleChange(value: string, name: string) {
        const updatedItem = {
            ...rowItem,
            [name]: value
        }
        setRowItem({...updatedItem, totalSalary: calculateTotalSalary(updatedItem)});
    }

    return(
        <tr className="bg-white border-b">
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
                {item[rowHeader]}
            </th>
                {dataFields.filter(prop => prop !== rowHeader).map((prop, index) => 
                    <RowItem 
                        key={index}
                        value={rowItem[prop]}
                        isEditing={isEditing}
                        isEditable={editableFields.includes(prop)}
                        name={prop}
                        handleChange={handleChange}
                    />
                )}
                <td className="px-6 py-4 text-right">
                    {isEditing ? 
                        <button className="font-medium text-gray-600 underline" onClick={() => { saveChanges(rowItem); setIsEditing(false); }}>
                            Save
                        </button>
                        :
                        <button className="font-medium text-gray-600 underline" onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                    }
                    {canDelete && handleDelete &&
                        <button className="ml-4 font-medium text-gray-600 underline" onClick={() => handleDelete(item.staffId)}>
                            Delete
                        </button> 
                    }
                </td>
        </tr>
    )
}
    