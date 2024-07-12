import moment from 'moment';

type RowItemProps = {
    isEditable: boolean;
    isEditing: boolean;
    value: string | number;
    name: string;
    handleChange?: (value: string, name: string, type: string) => void; 
    type: string;
}

export default function RowItem(props: RowItemProps) {
    const {isEditable, isEditing, value, handleChange, name, type} = props;
    const dateFormats = ['DD/MM/YYYY', 'YYYY-MM-DD'];
    
    return (isEditing && isEditable) ?
            <td>
                <input
                    className="text-center border-b-2 w-10/12 focus:ring focus:outline-none focus:ring-[#ff220f] rounded-md focus:ring-1"
                    type={type}
                    value={value}
                    name={name}
                    onChange={e => handleChange && handleChange(e.target.value, e.target.name, type)}
                />
            </td> : 
                    (type === 'date' ?
                        <td className="sm:px-0.5 sm:text-xs md:text-sm md:px-1 lg:px-6 py-4">{moment(value, dateFormats, true).format("DD/MM/YYYY")}</td>
                        :
                        <td className="sm:px-0.5 sm:text-xs md:text-sm md:px-1 lg:px-6 py-4">{value}</td>
                    )
}