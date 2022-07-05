import { Container, Button, Box } from '@mui/material'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import EmployeeSchedule from '../components/EmployeeSchedule'

const CreateSchedule = (props) => {
  let navigate = useNavigate()
  const temp = new Array(props.allEmployees.length).fill(0).map(() =>
    new Array(7).fill({
      employeeId: null,
      day: null,
      startTime: 0,
      endTime: 0,
      hours: 0
    })
  )
  const [dayOfWeek, setDayOfWeek] = useState(null)
  const [week, setWeek] = useState(25)
  const [year, setYear] = useState(new Date().getFullYear())
  const [times, setTimes] = useState(null)

  useEffect(() => {
    setDayOfWeek(getDateOfWeek(week, year))
    setTimes(temp)
    updateTimes()
  }, [week, props.allEmployees])

  function getDateOfWeek(w, y) {
    let daysOfWeek = []
    for (let i = 1; i <= 7; i++) {
      let d = i + 1 + (w - 1) * 7
      let date = new Date(y, 0, d)
      daysOfWeek.push(date)
    }
    return daysOfWeek
  }

  const updateTimes = () => {
    if (times && props.allEmployees) {
      let temp = times
      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[0].length; j++) {
          temp[i][j] = {
            ...temp[i][j],
            employeeId: props.allEmployees[i]._id,
            day: dayOfWeek[j]
          }
        }
      }
      setTimes(temp)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      week: week,
      year: year,
      schedule: times
    }
    const res = await axios.post(`${props.BASE_URL}/schedule/`, data)
    navigate('/schedules')
  }

  const handleWeekChange = (e) => {
    setWeek(e.target.value)
  }

  const handleYearChange = (e) => {
    setYear(e.target.value)
  }

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
        <table>
          <tr>
            <th>
              Week
              <input
                type="text"
                min={1}
                max={53}
                value={week}
                onChange={handleWeekChange}
              />
              Year
              <input type="text" value={year} onChange={handleYearChange} />
            </th>
            {dayOfWeek &&
              dayOfWeek.map((date) => <th>{date.toString().slice(0, 10)} </th>)}
          </tr>
          {props.allEmployees &&
            props.allEmployees.map((employee, row) => (
              <tr>
                <th>{employee.firstName + ' ' + employee.lastName}</th>
                {new Array(7).fill(0).map((e, i) => (
                  <th>
                    {dayOfWeek && (
                      <EmployeeSchedule
                        employeeId={employee._id}
                        date={dayOfWeek[i]}
                        row={row}
                        col={i}
                        times={times}
                        setTimes={setTimes}
                      />
                    )}
                  </th>
                ))}
              </tr>
            ))}
        </table>
        <Button onClick={handleSubmit}>Create Weekly Schedule</Button>
      </Container>
    </div>
  )
}

export default CreateSchedule
