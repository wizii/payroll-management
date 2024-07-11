import { useState } from 'react';
import RowItem from './row-item';
import type { DataField, Employee } from '@/app/types';
import { calculateTotalSalary } from '@/app/utils';
import moment from 'moment';

type RowProps = {
    rowHeader: string;
    dataFields: DataField[];
    item: Employee;
    editableFields: string[];
    saveChanges: (item: Employee) => void;
    handleDelete?: (id: string) => void;
    hasCheckBoxes?: boolean;
    handleSelect: (id: number, checked: boolean) => void;
    isSelected: boolean;
}

export default function Row(props: RowProps) {
    const { rowHeader, item, dataFields, editableFields, saveChanges, handleDelete, hasCheckBoxes, handleSelect, isSelected } = props;
    const [isEditing, setIsEditing]= useState(false);
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
            {hasCheckBoxes && 
                <td className="text-center">
                    <input 
                        type="checkbox" 
                        onChange={(e) => handleSelect(item.staffId, e.target.checked)}
                        checked={isSelected}
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
                {dataFields.filter(field => field.name !== rowHeader).map((field, index) => 
                    <RowItem 
                        key={index}
                        value={rowItem[field.name]}
                        isEditing={isEditing}
                        isEditable={editableFields.includes(field.name)}
                        name={field.name}
                        handleChange={handleChange}
                        type={field.type}
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
    