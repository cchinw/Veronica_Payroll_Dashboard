import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Button } from '@mui/material'

const AddEmployee = (props) => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    isCurrent: '',
    hourlyRate: 0
  })
  const [rate, setRate] = useState(0)

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

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
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
      <Button>View All Employees</Button>
    </div>
  )
}

export default AddEmployee
