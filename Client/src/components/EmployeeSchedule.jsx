import { useState } from 'react'
import { useEffect } from 'react'
const EmployeeSchedule = ({ employeeId, date, row, col, times, setTimes }) => {
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)

  const updateTimes = () => {
    if (times && times !== []) {
      let temp = times
      if (temp[row][col] !== undefined)
        temp[row][col] = {
          ...temp[row][col],
          employeeId: employeeId,
          day: date
        }
      setTimes(temp)
    }
  }

  useEffect(() => {
    console.log(times, 'times')
    // if (times !== []) updateTimes()
    return updateTimes()
  }, [])

  const handleChangeStart = (e) => {
    setStartTime(e.target.value)
    let temp = times
    let hours = parseInt(temp[row][col].endTime) - parseInt(e.target.value)
    if (hours < 0) hours = 0
    temp[row][col] = {
      ...temp[row][col],
      startTime: e.target.value,
      hours: hours,
      employeeId: employeeId,
      day: date
    }
    setTimes(temp)
  }

  const handleChangeEnd = (e) => {
    setEndTime(e.target.value)
    let temp = times
    let hours = parseInt(e.target.value) - parseInt(temp[row][col].startTime)
    if (hours < 0) hours = 0
    temp[row][col] = {
      ...temp[row][col],
      endTime: e.target.value,
      hours: hours,
      employeeId: employeeId,
      day: date
    }
    setTimes(temp)
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
        />{' '}
        AM
        <input
          type="number"
          name="endTime"
          min="9"
          max="18"
          value={endTime}
          placeholder="end time"
          onChange={(e) => handleChangeEnd(e)}
        />{' '}
        PM
      </th>
    </div>
  )
}
export default EmployeeSchedule
