import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toCamelCase } from "@/app/utils";
import Row from "./row";
import type { Employee } from "@/app/types";
import { useEmployees } from "@/app/context/employeesContext";

type TableProps = {
    headers: string[];
    editableFields: string[];
    rowHeader: string;
    refreshTable: () => void;
    saveChanges: (item: Employee) => void;
    handleDelete?: (id: string) => void;
    hasCheckBoxes?: boolean;
};

// TODO: Fix header gap
// TODO: Editable Date Field should be a drop down
// TODO: Select all
export default function Table(props: TableProps) {
    const { headers, rowHeader, editableFields, refreshTable, saveChanges, handleDelete, hasCheckBoxes } = props;
    const dataFields = headers.map(header => toCamelCase(header));
    const [areAllSelected, setAreAllSelected] = useState(false);
    const { employees, selectedIds, setSelectedIds } = useEmployees();


    const handleSelect = (id: number, checked: boolean) => {
      if(checked) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
      }
    };
    
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {hasCheckBoxes &&
              <th scope="col" className="px-6 py-3 text-center">
                <input type="checkbox" onChange={(e) => setAreAllSelected(e.target.checked)}></input>
              </th>
            }
            {headers.map((header, index) => <th key={index} scope="col" className="px-6 py-3">{header}</th>)}
          </tr>
        </thead>
        <tbody>
            {employees.map((item: Employee, index: number) => (
                <Row 
                  key={index} 
                  item={item}
                  rowHeader={rowHeader}
                  dataFields={dataFields}
                  editableFields={editableFields}
                  saveChanges={saveChanges}
                  handleDelete={handleDelete}
                  hasCheckBoxes={hasCheckBoxes}
                  handleSelect={handleSelect}
                />
            ))}
        </tbody>
      </table>
    </div>
  );
};
