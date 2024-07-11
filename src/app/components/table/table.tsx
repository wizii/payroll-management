import { useEffect } from "react";
import { toCamelCase } from "@/app/utils";
import Row from "./row";
import type { Employee } from "@/app/types";
import { useEmployees } from "@/app/context/employeesContext";

type TableProps = {
  headers: string[];
  editableFields: string[];
  rowHeader: string;
  saveChanges: (item: Employee) => void;
  handleDelete?: (id: string) => void;
  hasCheckBoxes?: boolean;
};

// TODO: Editable Date Field should be a drop down
// TODO: Pagination
export default function Table(props: TableProps) {
  const { headers, rowHeader, editableFields, saveChanges, handleDelete, hasCheckBoxes } = props;
  const dataFields = headers.map(header => toCamelCase(header));  
  const { employees, selectedIds, setSelectedIds } = useEmployees();
  
  useEffect(() => {
    setSelectedIds([]);
  }, []);

  const handleSelect = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = employees.map(employee => employee.staffId);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[600px]">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
          <tr>
            {hasCheckBoxes && (
              <th scope="col" className="px-6 py-3 text-center">
                <input type="checkbox" onChange={(e) => handleSelectAll(e.target.checked)}></input>
              </th>
            )}
            {headers.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto max-h-[500px]">
          {employees.map((item: Employee) => (
            <Row
              key={item.staffId}
              item={item}
              rowHeader={rowHeader}
              dataFields={dataFields}
              editableFields={editableFields}
              saveChanges={saveChanges}
              handleDelete={handleDelete}
              hasCheckBoxes={hasCheckBoxes}
              handleSelect={handleSelect}
              isSelected={selectedIds.includes(item.staffId)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
