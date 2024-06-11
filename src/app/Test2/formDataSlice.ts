
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

interface DataType {
    key: React.Key;
    title: string;
    firstname: string;
    lastname: string;
    birthday: dayjs.Dayjs;
    nationality: string;
    citizenID: string;
    gender: string;
    phone: string;
    passport: string;
    salary: string;
}


interface FormDataState {
    data: DataType[];
}


const initialState: FormDataState = {
    data: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('formData') || '[]') : [],
};

const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        addFormData: (state, action: PayloadAction<DataType>) => {
            state.data.push(action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('formData', JSON.stringify(state.data));
            }
        },
        setFormData: (state, action: PayloadAction<DataType[]>) => {
            state.data = action.payload;
            localStorage.setItem('formData', JSON.stringify(state.data));
        },
        deleteFormData: (state, action: PayloadAction<React.Key>) => {
            state.data = state.data.filter(item => item.key !== action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('formData', JSON.stringify(state.data));
            }
        },
    }});

export const { addFormData, setFormData, deleteFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
