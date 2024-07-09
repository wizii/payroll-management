import { useEffect, useState } from "react";
import { toCamelCase } from "@/app/utils";
import Row from "./row";
import type { Employee } from "@/app/types";

type TableProps = {
    headers: string[];
    editableFields: string[];
    content: Employee[];
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
    const { headers, content, rowHeader, editableFields, refreshTable, saveChanges, handleDelete, hasCheckBoxes } = props;
    const dataFields = headers.map(header => toCamelCase(header));
    const [areAllSelected, setAreAllSelected] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleSelect = (id: number, checked: boolean) => {
      console.log('before', selectedIds)
      if(checked) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
      }
      console.log('after', selectedIds)
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
            {content.map((item: Record<string, any>, index: number) => (
                <Row 
                  key={index} 
                  item={item}
                  rowHeader={rowHeader}
                  dataFields={dataFields}
                  editableFields={editableFields}
                  refreshTable={refreshTable}
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
