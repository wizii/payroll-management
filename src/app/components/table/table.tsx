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
};

// TODO: Fix header gap
// TODO: Action buttons
// TODO: Editable Date Field should be a drop down
export default function Table(props: TableProps) {
    const { headers, content, rowHeader, editableFields, refreshTable, saveChanges } = props;
    const dataFields = headers.map(header => toCamelCase(header));
    
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {headers.map((header, index) => <th key={index} scope="col" className="px-6 py-3">{header}</th>)}
          </tr>
        </thead>
        <tbody>
            {content.map((item: Record<string, any>, index: number) => (
                <Row key={index} item={item} rowHeader={rowHeader} dataFields={dataFields} editableFields={editableFields} refreshTable={refreshTable} saveChanges={saveChanges}></Row>
            ))}
        </tbody>
      </table>
    </div>
  );
};
