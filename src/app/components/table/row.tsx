import { useState } from "react";
import RowItem from "./row-item";
import { Employee } from "@/app/types";
import { calculateTotalSalary } from "@/app/utils";

type RowProps = {
    rowHeader: string;
    dataFields: string[];
    item: Employee;
    editableFields: string[];
    saveChanges: (item: Employee) => void;
    handleDelete?: (id: string) => void;
    hasCheckBoxes?: boolean;
    handleSelect: (id: number, checked: boolean) => void;
}

export default function Row(props: RowProps) {
    const { rowHeader, item, dataFields, editableFields, saveChanges, handleDelete, hasCheckBoxes, handleSelect } = props;
    const [isEditing, setIsEditing]= useState(false);
    const initialTotalSalary = calculateTotalSalary(item);
    const [rowItem, setRowItem] = useState({...item, totalSalary: initialTotalSalary });



    function handleChange(value: string, name: string) {
        const updatedItem = {
            ...rowItem,
            [name]: value
        }
        setRowItem({...updatedItem, totalSalary: calculateTotalSalary(updatedItem)});
        console.log(rowItem)
    }

    return(
        <tr className="bg-white border-b">
            {hasCheckBoxes && 
                <td className="text-center">
                    <input 
                        type="checkbox" 
                        onChange={(e) => handleSelect(item.staffId, e.target.checked)}
                        
                    >
                    </input>
                </td>
            }
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
                    {handleDelete &&
                        <button className="ml-4 font-medium text-gray-600 underline" onClick={() => handleDelete(item.staffId)}>
                            Delete
                        </button> 
                    }
                </td>
        </tr>
    )
}
    