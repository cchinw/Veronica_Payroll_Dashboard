import { Button, Container, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { useState } from 'react'

const EmployeeProfile = (props) => {
  const { id } = useParams()
  let navigate = useNavigate()

  const [employee, setEmployee] = useState(null)
  const [employeeFormValues, setEmployeeFormValues] = useState({
    firstName: '',
    lastName: '',
    isCurrent: true
  })

  const getEmployee = async () => {
    const res = await axios.get(`${props.BASE_URL}/employee/${id}`)
    setEmployee(res.data)
  }

  useEffect(() => {
    getEmployee()
  }, [])

  const handleEmployeeSubmit = async (e, id) => {
    e.preventDefault()
    const data = {
      firstName: employeeFormValues.firstName,
      lastName: employeeFormValues.lastName,
      isCurrent: employeeFormValues.isCurrent
    }
    console.log(id, 'EMPLOYEE ID')
    console.log(data, 'Employee DATAAAA')
    console.log(props.BASE_URL, 'BASE URL')
    const res = await axios.put(`${props.BASE_URL}/employee/${id}`, data)
    setEmployee({
      ...employee,
      firstName: employeeFormValues.firstName,
      lastName: employeeFormValues.lastName,
      isCurrent: employeeFormValues.isCurrent
    })
    props.setEmployeeUpdate(true)
    navigate('/employees')
  }

  const handleEmployeeChange = (e) => {
    e.preventDefault()
    setEmployeeFormValues({
      ...employeeFormValues,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Container>
      {employee && (
        <Container>
          <div>
            <TextField
              required
              name="firstName"
              id="outlined-required"
              label="First Name"
              defaultValue={employee.firstName}
              onChange={handleEmployeeChange}
            />
            <TextField
              required
              name="lastName"
              id="outlined-required"
              label="Last Name"
              defaultValue={employee.lastName}
              onChange={handleEmployeeChange}
            />
            <TextField
              required
              name="isCurrent"
              id="outlined-required"
              label="Current Employee?"
              defaultValue={true}
              onChange={handleEmployeeChange}
            />
            <div>
              <Button
                className="btn"
                onClick={(e) => handleEmployeeSubmit(e, employee._id)}
              >
                Update
              </Button>
              <Button className="btn" onClick={() => navigate(`/employees`)}>
                Cancel
              </Button>
            </div>
          </div>
        </Container>
      )}
    </Container>
  )
}
export default EmployeeProfile
