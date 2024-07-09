import { useState } from "react";
import RowItem from "./row-item";
import { useEmployees } from "@/app/context/employeesContext";
import { Employee } from "@/app/types";

type RowProps = {
    rowHeader: string;
    dataFields: string[];
    item: Employee;
    editableFields: string[];
    refreshTable: () => void;
    saveChanges: (item: Employee) => void;
}

export default function Row(props: RowProps) {
    const { rowHeader, item, dataFields, editableFields, refreshTable, saveChanges } = props;
    const [isEditing, setIsEditing]= useState(false);
    const [rowItem, setRowItem] = useState(item);

    function handleChange(value: string, name: string) {
        setRowItem({
            ...rowItem,
            [name]: value
        });
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
                    
                </td>
        </tr>
    )
}
    