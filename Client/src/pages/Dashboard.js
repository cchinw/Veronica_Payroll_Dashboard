import { Container } from '@mui/system'
import Employees from './Employees'
import Payroll from './Payroll'
import CreateSchedule from './CreateSchedule'
import { Box, Card, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

const Dashboard = (props) => {
  let navigate = useNavigate()
  return (
    <Container>
      <Box sx={{ minWidth: 275 }}>
        <h1>Dashboard</h1>
        <Card
          onClick={() => navigate('/employees')}
          variant="outlined"
          sx={{ maxWidth: 345 }}
        >
          <Typography variant="body2" color="text.secondary">
            <Employees
              BASE_URL={props.BASE_URL}
              allEmployees={props.allEmployees}
              setAllEmployees={props.setAllEmployees}
              employee={props.employee}
              setEmployee={props.setEmployee}
              employeeUpdate={props.employeeUpdate}
              employeeDelete={props.employeeDelete}
              setEmployeeUpdate={props.setEmployeeUpdate}
              setEmployeeDelete={props.setEmployeeDelete}
            />
          </Typography>
        </Card>
        <Paper onClick={() => navigate('/payroll')}>
          <Payroll
            payroll={props.payroll}
            setPayroll={props.setPayroll}
            allEmployees={props.allEmployees}
            setAllEmployees={props.setAllEmployees}
            specificPayroll={props.specificPayroll}
            setSpecificPayroll={props.setSpecificPayroll}
          />
        </Paper>
        {/* <Paper onClick={() => navigate('/schedule')}>
          <Schedules
            BASE_URL={props.BASE_URL}
            allEmployees={props.allEmployees}
            setAllEmployees={props.setAllEmployees}
            allDailySchedule={props.allDailySchedule}
            setAllDailySchedule={props.setAllDailySchedule}
            allWeeklySchedule={props.allWeeklySchedule}
            setAllWeeklySchedule={props.setAllWeeklySchedule}
          />
        </Paper> */}
      </Box>
    </Container>
  )
}

export default Dashboard
