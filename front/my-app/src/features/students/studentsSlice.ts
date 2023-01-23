import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState} from '../../app/store';
import Student from '../../models/Student';
import {getStudents,addStudent,addStudentScore} from './studentsAPI';

export interface studentsState {
  student:Student[],
  refresh:boolean
}

const initialState: studentsState = {
  student:[],
  refresh: false
};

// get all students
export const getStudentsAsync = createAsyncThunk(
  'students/getStudents',
  async () => {
    const response = await getStudents();
    console.log(response.data)
    return response.data;
  }
);

// add student
export const addStudentAsync = createAsyncThunk(
  'students/addStudent',
  async (student:Student) =>{
    const response = await addStudent(student);
    return response.data;
  }
);

// add student score
export const addStudentScoreAsync = createAsyncThunk(
  'students/addStudentScore',
  async (student:Student) =>{
    const response = await addStudentScore(student);
    return response.data;
  }
);

// create sliser
export const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentsAsync.fulfilled, (state,action) => {
        state.student = action.payload
        state.refresh = !state.refresh
      })
      .addCase(addStudentScoreAsync.fulfilled, (state) => {
        state.refresh = !state.refresh
      })
      ;   
  },
});

export const { } = studentsSlice.actions;
export const selectRefresh = (state: RootState) => state.students.refresh;
export const selectStudent = (state: RootState) => state.students.student;
export default studentsSlice.reducer;
