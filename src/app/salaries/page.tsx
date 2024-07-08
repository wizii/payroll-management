import Table from "../components/table";

export default function Salaries() {
    const headers=['Staff Id', 'Name', 'Salary', 'Additions', 'Deductions'];
    return (
        <div className={`grid grid-cols-5 p-6 bg-[#f1f7ff]/50 text-gray-500`}>
            {headers.map((header, index) => 
                <div key={index}>{header}</div>
            )}

        </div>
    )
}