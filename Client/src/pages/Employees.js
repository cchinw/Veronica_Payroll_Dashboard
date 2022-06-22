import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AddEmployee from './AddEmployee'
import EmployeeProfile from '../components/EmployeeProfile'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Container } from '@mui/system'

export default function Employees(props) {
  let navigate = useNavigate()

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Employees List</h2>
      <div>
        <Button
          onClick={() => {
            navigate('/employee')
          }}
        >
          <PersonAddAltIcon />
          Add new Employee
        </Button>
      </div>
      <div className="employee-container">
        {props.allEmployees &&
          props.allEmployees.map((employee) => (
            <Container
              className="child"
              key={employee.id}
              onClick={() => navigate(`/employee/${employee._id}`)}
              style={{ border: `5px solid #0064f4` }}
            >
              <h3>
                Full name: {employee.firstName} {employee.lastName}
              </h3>
              <h4>Current Employee: {employee.isCurrent.toString()}</h4>
            </Container>
          ))}
      </div>
    </div>
  )
}
