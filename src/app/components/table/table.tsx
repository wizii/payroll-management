import { useEffect, useState } from 'react';
import Row from './row';
import type { Employee } from '@/app/types';
import { useEmployees } from '@/app/context/employeesContext';
import type { DataField } from '@/app/types';

type TableProps = {
  headers: string[];
  editableFields: string[];
  rowHeader: string;
  saveChanges: (item: Employee) => void;
  handleDelete?: (id: string) => void;
  hasCheckBoxes?: boolean;
  dataFields: DataField[]
};

export default function Table(props: TableProps) {
  const { headers, rowHeader, editableFields, saveChanges, handleDelete, hasCheckBoxes, dataFields } = props;
  const { employees, selectedIds, setSelectedIds } = useEmployees();
  const [searchKey, setSearchKey] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  
  useEffect(() => {
    setSelectedIds([]);
  }, []);

  useEffect(() => {
    const filtered = employees.filter(employee => 
      employee.name.toLowerCase().includes(searchKey.toLowerCase()) ||
      employee.staffId.toString().includes(searchKey)
    );
    setFilteredEmployees(filtered);

  }, [searchKey, employees]);

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
    <div className="flex flex-col">
      <input 
          className="mb-2 w-1/3 h-8 self-end pl-8 bg-[url('/icons/search.svg')] bg-contain bg-no-repeat bg-left-top outline-none rounded-md border text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
          onChange={e => setSearchKey(e.target.value)}
          placeholder="Search for an employee by name or id"
          value={searchKey}
        />
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
            {filteredEmployees.length ? (
              filteredEmployees.map((item: Employee) => (
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
              ))
            ) : (
              <tr>
                <td colSpan={headers.length + (hasCheckBoxes ? 2 : 1)} className="text-lg w-full text-center py-4">
                  There is no employee data to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
