import { ButtonGroup, Button } from '@mui/material'
const EmployeeSchedule = (props) => {
  return (
    <div>
      {}
      <th>
        <input
          type="text"
          name="startTime"
          value={props.dailySchedule.startTime}
          placeholder="start time"
          required
          onChange={props.handleDailyChange}
        />
        <input
          type="text"
          name="endTime"
          value={props.dailySchedule.endTime}
          placeholder="end time"
          required
          onChange={props.handleDailyChange}
        />
      </th>
    </div>
  )
}
export default EmployeeSchedule
