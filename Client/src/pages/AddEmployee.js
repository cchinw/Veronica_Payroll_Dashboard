import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Button, Container } from '@mui/material'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const AddEmployee = (props) => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    isCurrent: '',
    hourlyRate: 0
  })
  const [rate, setRate] = useState(0)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    const addNewEmployee = async () => {
      const employeeData = {
        firstName: '',
        lastName: '',
        isCurrent: false
      }

      const employeeRes = await axios
        .post(`${props.BASE_URL}/employee`, employeeData)
        .then(function (res) {
          if (res.status === 200) {
            setRate(employeeRes.data)
          }
        })
    }

    const setEmployeeRate = async () => {
      const rateData = {
        hourlyRate: 0
      }

      const payRate = await axios
        .post(`${props.BASE_URL}/payrate`, rateData)
        .then(function (res) {
          if (res.status === 200) {
            setRate(payRate.data)
          }
        })
    }

    e.preventDefault()
    await addNewEmployee({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      isCurrent: formValues.isCurrent
    })
    await setEmployeeRate({
      hourlyRate: formValues.hourlyRate
    })
    setFormValues({
      firstName: '',
      lastName: '',
      isCurrent: '',
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
          <form className="forms" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                onChange={handleChange}
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formValues.firstName}
                required
              />
            </div>
            <div className="input-wrapper">
              <input
                onChange={handleChange}
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formValues.lastName}
                required
              />
            </div>
            <div className="input-wrapper">
              <label for="status">Currently Employed?</label>
              <select
                onChange={handleChange}
                name="isCurrent"
                value={formValues.isCurrent}
                required
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="input-wrapper">
              <input
                onChange={handleChange}
                type="number"
                name="payrate"
                placeholder="Pay Rate"
                value={formValues.hourlyRate}
                required
              />
            </div>
            <Button className="glow-on-hover-register">Create Employee</Button>
          </form>
        </div>
      </Box>
    </div>
  )
}

export default AddEmployee
