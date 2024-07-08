type TableProps = {
    headers: string[];
    content: Record<string, any>;
    rowHeader: string;
};

// TODO: Fix header gap
export default function Table(props: TableProps) {
    const { headers, content, rowHeader } = props;
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
                <tr key={index} className="bg-white border-b">
                    <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                        {item[rowHeader]}
                    </th>
                    {Object.keys(item).filter(key => key !== rowHeader).map((prop, index) => <td key={index} className="px-6 py-4">{item[prop]}</td>)}
                    <td className="px-6 py-4 text-right">
                        <button className="font-medium text-gray-600 underline">
                            Edit
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
