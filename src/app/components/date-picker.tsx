import { DateView } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type CustomDatePickerProps = {
    name?: string;
    views?: DateView[];
};

export default function CustomDatePicker(props: CustomDatePickerProps) {
    return <DatePicker
                name={props.name}
                views={props.views}
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