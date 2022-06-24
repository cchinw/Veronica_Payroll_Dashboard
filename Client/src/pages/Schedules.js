// This page is meant to display all the schedules created on a table. I did not have enough time to render it out.

import { Container } from '@mui/material'
import axios from 'axios'
import { useEffect } from 'react'

const Schedules = (props) => {
  const getAllDailySchedule = async () => {
    const res = await axios.get(`${props.BASE_URL}/dailyschedule`)
    props.setAllDailySchedule(res.data)
  }

  useEffect(() => {
    getAllDailySchedule()
  }, [])

  return (
    <div className="schedules">
      {props.allDailySchedule && (
        <Container>
          <div>
            <h2>Daily Schedule</h2>
            <h4>Employee Full Name: {props.allDailySchedule.employeeId}</h4>
          </div>
        </Container>
      )}
    </div>
  )
}

export default Schedules
