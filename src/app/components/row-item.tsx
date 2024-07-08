type RowItemProps = {
    isEditable: boolean;
    isEditing: boolean;
    value: string;
}

export default function RowItem(props: RowItemProps) {
    const {isEditable, isEditing, value} = props;
    
    return (isEditing && isEditable) ?
            <input className="border-b-2 px-2 w-10/12 focus:ring focus:outline-none focus:ring-[#ff220f] rounded-md focus:ring-1" type="text" value={'yes'} /> : 
            <div className="text-gray-500">not</div>

    
}