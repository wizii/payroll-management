type RowItemProps = {
    isEditable: boolean;
    isEditing: boolean;
    value: string | number;
    name: string;
    handleChange?: (value: string, name:string) => void; 
}

// TODO: Remove arrows from input
export default function RowItem(props: RowItemProps) {
    const {isEditable, isEditing, value, handleChange, name} = props;
    
    return (isEditing && isEditable) ?
            <input
                className="text-center border-b-2 w-10/12 focus:ring focus:outline-none focus:ring-[#ff220f] rounded-md focus:ring-1"
                type="number"
                defaultValue={value}
                value={value}
                onChange={e => handleChange && handleChange(e.target.value, name)}
            /> : 
            <div className="text-gray-500">{value}</div>

    
}