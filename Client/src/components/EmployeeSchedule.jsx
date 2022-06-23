import { useState } from 'react'
import { ButtonGroup, Button } from '@mui/material'
import { useEffect } from 'react'
const EmployeeSchedule = ({ employeeId, date, row, col, times, setTimes }) => {
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)

  useEffect(() => {
    updateTimes()
  }, [times, row, col])

  const updateTimes = () => {
    let temp = times
    console.log(temp, 'TEMP')
    temp[row][col] = { ...temp[row][col], employeeId: employeeId, day: date }
    setTimes(temp)
  }

  const handleChangeStart = (e) => {
    setStartTime(e.target.value)
    let temp = times
    let hours = temp[row][col].endTime - temp[row][col].startTime
    if (hours < 0) hours = 0
    temp[row][col] = {
      ...temp[row][col],
      startTime: e.target.value,
      hours,
      employeeId: employeeId,
      day: date
    }
    setTimes(temp)
    console.log(times)
  }

  const handleChangeEnd = (e) => {
    setEndTime(e.target.value)
    let temp = times
    let hours = temp[row][col].endTime - temp[row][col].startTime
    if (hours < 0) hours = 0
    temp[row][col] = {
      ...temp[row][col],
      endTime: e.target.value,
      hours,
      employeeId: employeeId,
      day: date
    }
    setTimes(temp)
    console.log(times)
  }

  return (
    <div>
      <th>
        <input
          type="number"
          name="startTime"
          min="9"
          max="18"
          value={startTime}
          placeholder="start time"
          onChange={(e) => handleChangeStart(e)}
        />
        <input
          type="number"
          name="endTime"
          min="9"
          max="18"
          value={endTime}
          placeholder="end time"
          onChange={(e) => handleChangeEnd(e)}
        />
      </th>
    </div>
  )
}
export default EmployeeSchedule
