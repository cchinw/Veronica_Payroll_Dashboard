import { Container } from '@mui/material'
import axios from 'axios'
import { useEffect } from 'react'

const Schedules = (props) => {
  const getAllDailySchedule = async () => {
    const res = await axios.get(`${props.BASE_URL}/dailyschedule`)
    console.log(res, 'DAILY SCHEDULE RES')
    props.setAllDailySchedule(res.data)
  }

  useEffect(() => {
    getAllDailySchedule()
  }, [])
  console.log(props.allDailySchedule, 'ALL DAILY SCHEDULE')

  return (
    <div className="schedules">
      {props.allDailySchedule && (
        <Container>
          <div>
            <h2>Daily Schedule</h2>
            <h4>Employee Full Name: {props.allDailySchedule.undefined}</h4>
          </div>
        </Container>
      )}
    </div>
  )
}

export default Schedules
