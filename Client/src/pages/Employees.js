import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AddEmployee from './AddEmployee'
import EmployeeProfile from '../components/EmployeeProfile'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Container } from '@mui/system'

export default function Employees(props) {
  let { id } = useParams()
  let navigate = useNavigate()

  const getEmployees = async () => {
    let res = await axios.get(`${props.BASE_URL}/employee`)
    props.setAllEmployees(res.data)
    console.log(res.data, 'FIRSTNAME')
  }

  const getSpecificEmployee = async () => {
    let res = await axios.get(`${props.BASE_URL}/employee/${id}`)
    props.setSpecificEmployees(res.data)
    console.log(res, 'EMPLOYEES')
  }

  useEffect(() => {
    getEmployees()
  }, [])

  useEffect(() => {
    getSpecificEmployee()
  }, [])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Employees List</h2>
      <div>
        <Button
          onClick={() => {
            navigate('/employee')
          }}
        >
          <AddCircleIcon />
        </Button>
      </div>
      <div className="employee-container">
        {props.allEmployees.map((employee) => (
          <Container
            className="child"
            key={employee.id}
            onClick={() => navigate('/employee')}
            style={{ border: `5px solid #0064f4` }}
          >
            <h3>
              Full name: {employee.firstName} {employee.lastName}
            </h3>
            <h4>Current Employee? {employee.isCurrent}</h4>
          </Container>
        ))}
      </div>
    </div>
  )
}
