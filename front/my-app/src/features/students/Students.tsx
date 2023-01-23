import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Student from '../../models/Student';
import {getStudentsAsync, addStudentAsync, addStudentScoreAsync, selectStudent, selectRefresh } from './studentsSlice';

const Students = () => {
  const refresh = useAppSelector(selectRefresh)
  const users = useAppSelector(selectStudent)
  const dispatch = useAppDispatch();
  const subjects = ["Math", "English", "Computers"]
const [Search, setSearch] = useState('')
  const [sname, setsname] = useState("")
  const [email, setemail] = useState("")
  const [score, setscore] = useState(0)
  const [subject, setsubject] = useState('Math');

  const filteredUsers = users.filter(user => user.email.includes(Search));

  useEffect(() => {
    dispatch(getStudentsAsync())
  }, [refresh])

  return (
    <div>
      {/* add student */}
      <hr></hr>
      -Add student-<br />
      Student name:<input onChange={(e) => setsname(e.target.value)}></input>
      Email:<input onChange={(e) => setemail(e.target.value)}></input>
      <button onClick={() => dispatch(addStudentAsync({ sname, email }))}>add student</button>
      <hr />

      {/* add score */}
      -Add student score-<br />
      Subject:<select value={subject} onChange={e => setsubject(e.target.value)}>
        {subjects.map(sub => (<option key={sub} value={sub}> {sub}</option>))}
      </select>
      Score:<input onChange={(e) => { setscore(+e.target.value) }}></input>

      <hr />

      {/* shearch by name */}
      -find student by his email-<br/>
      Email:<input onChange={(e) => setSearch(e.target.value)}></input><hr />

      {/* display all students */}
      <table>
        <thead>
          <tr>
            <th>Student name</th>
            <th>Email</th>
            <th>Math Score</th>
            <th>English Score</th>
            <th>Computer Score</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, i) => (
            <tr key={i}>
              <td>{user.sname}</td>
              <td>{user.email}</td>
              <td>{user.mathscore}</td>
              <td>{user.englishscore}</td>
              <td>{user.compscore}</td>
              <td><button onClick={() => dispatch(addStudentScoreAsync({ sname: user.sname, email, mathscore: subject === 'Math' ? score : user.mathscore, englishscore: subject === 'English' ? score : user.englishscore, compscore: subject === 'Computers' ? score : user.compscore }))}>update score</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      {/* serch by name */}


    </div>
  )
}

export default Students