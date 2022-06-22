import { Container } from '@mui/system'
import Employees from './Employees'
import Payroll from './Payroll'
import Schedules from './Schedules'
import Report from './Report'
import Search from '../components/Search'
import { Box, Card, Divider, Paper } from '@mui/material'

const Dashboard = (props) => {
  return (
    <Container>
      <Box sx={{ minWidth: 275 }}>
        <h1>Dashboard</h1>
        <Card variant="outlined" square>
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
        </Card>
        <Paper>
          <Payroll
            payroll={props.payroll}
            setPayroll={props.setPayroll}
            allEmployees={props.allEmployees}
            setAllEmployees={props.setAllEmployees}
            specificPayroll={props.specificPayroll}
            setSpecificPayroll={props.setSpecificPayroll}
          />
        </Paper>
        <Paper>
          <Schedules
            BASE_URL={props.BASE_URL}
            allEmployees={props.allEmployees}
            setAllEmployees={props.setAllEmployees}
            allDailySchedule={props.allDailySchedule}
            setAllDailySchedule={props.setAllDailySchedule}
            allWeeklySchedule={props.allWeeklySchedule}
            setAllWeeklySchedule={props.setAllWeeklySchedule}
          />
        </Paper>
        {/* <Paper>
            <Report />
          </Paper> */}
      </Box>
    </Container>
  )
}

export default Dashboard
