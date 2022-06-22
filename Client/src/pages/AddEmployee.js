import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Button, Container } from '@mui/material'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import CreateSchedule from './CreateSchedule'

const AddEmployee = (props) => {
  let navigate = useNavigate()

  const [employeeFormValues, setEmployeeFormValues] = useState({
    firstName: '',
    lastName: '',
    isCurrent: false
  })
  const [rate, setRate] = useState({
    employeeId: '',
    hourlyRate: 0
  })

  const handleEmployeeChange = (e) => {
    setEmployeeFormValues({
      ...employeeFormValues,
      [e.target.name]: e.target.value
    })
  }
  const handleRateChange = (e) => {
    setRate({
      ...rate,
      hourlyRate: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const addNewEmployee = async () => {
      const employeeData = {
        firstName: employeeFormValues.firstName,
        lastName: employeeFormValues.lastName,
        isCurrent: employeeFormValues.isCurrent
      }

      const employeeRes = await axios.post(
        `${props.BASE_URL}/employee`,
        employeeData
      )
      setRate({ ...rate, employeeId: employeeRes.data._id })
    }

    const setEmployeeRate = async () => {
      const payRate = await axios.post(`${props.BASE_URL}/payrate`, rate)
    }

    e.preventDefault()
    await addNewEmployee()
    await setEmployeeRate()
    setEmployeeFormValues({
      firstName: '',
      lastName: '',
      isCurrent: false
    })
    setRate({
      employeeId: '',
      hourlyRate: 0
    })
    navigate('/employees')
  }

  return (
    <div className="addemployee">
      <Button onClick={() => navigate('/employees')}>
        View All Employees
        <SupervisedUserCircleIcon />
      </Button>
      <Container style={{ border: `5px solid #0064f4` }}></Container>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <form className="forms">
            <div className="input-wrapper">
              <input
                onChange={handleEmployeeChange}
                name="firstName"
                type="text"
                placeholder="First Name"
                value={employeeFormValues.firstName}
                required
              />
            </div>
            <div className="input-wrapper">
              <input
                onChange={handleEmployeeChange}
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={employeeFormValues.lastName}
                required
              />
            </div>
            <Divider />
            <div className="input-wrapper">
              <label for="status">Currently Employed?</label>
              <select
                onChange={handleEmployeeChange}
                name="isCurrent"
                value={employeeFormValues.isCurrent}
                required
              >
                <option>True</option>
                <option>False</option>
              </select>
            </div>
            <div className="input-wrapper">
              <input
                onChange={handleRateChange}
                type="number"
                name="payrate"
                placeholder="Pay Rate"
                // value={rate.hourlyRate}
                required
              />
            </div>
            <Button onClick={handleSubmit} className="glow-on-hover-register">
              Create Employee
            </Button>
          </form>
        </div>
      </Box>
    </div>
  )
}

export default AddEmployee
