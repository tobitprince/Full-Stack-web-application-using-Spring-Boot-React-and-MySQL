import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Button } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import { useEffect } from 'react';

export default function Student() {
    const paperStyle={padding:'50px 20px', width:600, margin:"20px auto" }
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[students, setStudents]=useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        const student={name,address}
        console.log(student)
        fetch("http://localhost:8080/student/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=>{
            console.log("New Student added")
        })
    }
  useEffect(()=>{
    fetch("http://localhost:8080/student/getAll")
    .then(res=>res.json())
    .then((result)=>{
      setStudents(result);
    }
    )
  },[])
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1} }}
      noValidate
      autoComplete="off"
    >
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u> Add Student</u></h1>
      <TextField id="student-name" label="Student Name" variant="standard" fullWidth
      value={name}
      onChange={(e)=>setName(e.target.value)} />
      <TextField id="student-address" label="Student Address" variant="standard" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)} />
      <br></br>
      <Button variant="contained" endIcon={<PublishIcon />} onClick={handleClick}>
        Submit
      </Button>
      </Paper>
    </Box>
  );
}
