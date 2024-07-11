import { DateView } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

type CustomDatePickerProps = {
    name?: string;
    views?: DateView[];
    value: Dayjs | null;
    onChange?: (date: Dayjs | null) => void;
};

export default function CustomDatePicker(props: CustomDatePickerProps) {
    const { name, value, views, onChange } = props;
    return <DatePicker
                name={name}
                views={views}
                value={value}
                onChange={onChange}
                sx={{
                        '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#ff220f',
                        },
                        '&:hover fieldset': {
                            borderColor: '#ff220f',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#ff220f',
                        },
                        },
                        '& .MuiInputBase-input': {
                            padding: '8px',
                        },
                }}
            />
}