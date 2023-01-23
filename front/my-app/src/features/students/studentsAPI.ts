import { MY_SERVER } from '../../env';
import axios from 'axios';
import Student from '../../models/Student';

export async function getStudents() {
  return await axios.get(MY_SERVER)
}

export async function addStudent(student:Student) {
  return await axios.post(MY_SERVER+"/add",student)
}

export async function addStudentScore(student:Student) {
  return await axios.put(MY_SERVER+"/addscore/"+student.sname ,student)
}
