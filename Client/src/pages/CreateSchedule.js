import {
  Container,
  Button,
  Box,
  TextField,
  Divider,
  MenuItem
} from '@mui/material'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const CreateSchedule = (props) => {
  let navigate = useNavigate()

  const [dailySchedule, setDailySchedule] = useState({
    day: Date,
    startTime: '',
    endTime: '',
    hours: 0
  })

  const [weeklySchedule, setWeeklySchedule] = useState({
    startDate: Date,
    endDate: Date,
    totalHours: 0
  })

  const [selectedEmployee, setSelectedEmployee] = useState('employee')

  const handleDailyChange = (e) => {
    setDailySchedule({
      ...dailySchedule,
      [e.target.name]: e.target.value
    })
  }

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee)
  }

  const handleWeeklyChange = (e) => {
    setWeeklySchedule({
      ...weeklySchedule,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const createDailySchedule = async () => {
      const dailyData = {
        employeeId: dailySchedule.employeeId,
        day: dailySchedule.day,
        startTime: dailySchedule.startTime,
        endTime: dailySchedule.endTime,
        hours: dailySchedule.hours
      }

      const dailyRes = await axios.post(
        `${props.BASE_URL}/dailyschedule`,
        dailyData
      )
      console.log(dailyRes, 'DAILY RESPONSE')
      setDailySchedule({ ...dailySchedule, employeeId: props.allEmployees._id })
    }

    const createWeeklySchedule = async () => {
      const weeklyData = {
        employeeId: weeklySchedule.employeeId,
        startDate: weeklySchedule.startDate,
        endDate: weeklySchedule.endDate,
        totalHours: weeklySchedule.totalHours
      }

      const weeklyRes = await axios.post(
        `${props.BASE_URL}/weeklyschedule`,
        weeklyData
      )
      console.log(weeklyRes, 'DAILY RESPONSE')
      setWeeklySchedule({
        ...weeklySchedule,
        employeeId: props.allEmployees._id
      })
    }

    e.preventDefault()
    await createDailySchedule()
    await createWeeklySchedule()
    setDailySchedule({
      employeeId: '',
      day: Date,
      startTime: '',
      endTime: '',
      hours: 0
    })
    setWeeklySchedule({
      employeeId: '',
      startDate: Date,
      endDate: Date,
      totalHours: 0
    })
    navigate('/schedules')
  }
  console.log(dailySchedule, 'DAILYSCHEDULE')

  return (
    <div className="create-schedule">
      <Button onClick={() => navigate('/schedules')}>
        View All Schedules
        <PermContactCalendarIcon />
      </Button>
      <Container style={{ border: `5px solid #0064f4` }}></Container>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete="off"
      ></Box>
      <Container>
        <form className="forms">
          <TextField
            select
            label="Select Employee"
            value={
              selectedEmployee ? selectedEmployee.firstName : 'Select Employee'
            }
            onChange={handleDailyChange}
            helperText="Please select an employee"
          >
            {props.allEmployees.map((employee, i) => (
              <MenuItem
                onClick={() => {
                  handleSelectEmployee(employee)
                }}
                key={i}
                value={employee.firstName + ' ' + employee.lastName}
              >
                {employee.firstName + ' ' + employee.lastName}
              </MenuItem>
            ))}
          </TextField>
          <div className="input-wrapper">
            <input
              onChange={handleDailyChange}
              name="day"
              type="date"
              placeholder="Shift Day"
              value={dailySchedule.day}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              onChange={handleDailyChange}
              name="startTime"
              type="time"
              placeholder="Shift End"
              value={dailySchedule.startTime}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              onChange={handleDailyChange}
              name="endTime"
              type="time"
              placeholder="Shift End"
              value={dailySchedule.endTime}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              onChange={handleDailyChange}
              name="hours"
              type="number"
              placeholder="Work Hours"
              // value={dailySchedule.hours}
              required
            />
          </div>
          <Button onClick={handleSubmit} className="glow-on-hover-register">
            Create Daily Schedule
          </Button>
          <Divider />
          <TextField
            select
            label="Select Employee"
            value={
              selectedEmployee ? selectedEmployee.firstName : 'Select Employee'
            }
            onChange={handleWeeklyChange}
            helperText="Please select an employee"
          >
            {props.allEmployees.map((employee, i) => (
              <MenuItem
                onClick={() => {
                  handleSelectEmployee(employee)
                }}
                key={i}
                value={employee.firstName + ' ' + employee.lastName}
              >
                {employee.firstName + ' ' + employee.lastName}
              </MenuItem>
            ))}
          </TextField>
          <div className="input-wrapper">
            <input
              onChange={handleWeeklyChange}
              name="startDate"
              type="date"
              placeholder="Week Start"
              value={weeklySchedule.startDate}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              onChange={handleWeeklyChange}
              name="endDate"
              type="date"
              placeholder="Week End"
              value={weeklySchedule.endDate}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              onChange={handleWeeklyChange}
              name="weeklyHours"
              type="number"
              placeholder="Week Hours"
              // value={weeklySchedule.totalHours}
              required
            />
          </div>
          <Button onClick={handleSubmit} className="glow-on-hover-register">
            Create Weekly Schedule
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default CreateSchedule
