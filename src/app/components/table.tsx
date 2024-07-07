type TableProps = {
    headers: string[];
}

export default function Table(props: TableProps) {
    const { headers } = props
    const gridCols = `${headers.length}`
    console.log(gridCols)

    return (
        <div className={`grid grid-cols-${gridCols} p-6 bg-[#f1f7ff]/50 text-gray-500`}>
            {headers.map((header, index) => 
                <div key={index}>{header}</div>
            )}

        </div>
    )
}