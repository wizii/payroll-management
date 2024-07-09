type RowItemProps = {
    isEditable: boolean;
    isEditing: boolean;
    value: string | number;
    name: string;
    handleChange?: (value: string, name: string) => void; 
}

// TODO: Fix editable input fields UI
export default function RowItem(props: RowItemProps) {
    const {isEditable, isEditing, value, handleChange, name} = props;
    
    return (isEditing && isEditable) ?
            <td>
                <input
                    className="text-center border-b-2 w-10/12 focus:ring focus:outline-none focus:ring-[#ff220f] rounded-md focus:ring-1"
                    type="text"
                    defaultValue={value}
                    value={value}
                    name={name}
                    onChange={e => handleChange && handleChange(e.target.value, e.target.name)}
                />
            </td> : 
            <td className="px-6 py-4">{value}</td>

    
}