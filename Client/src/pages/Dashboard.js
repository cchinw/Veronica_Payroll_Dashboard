import { Container } from '@mui/system'
import Employees from './Employees'
import Payroll from './Payroll'
import Schedules from './Schedules'
import Report from './Report'
import Search from '../components/Search'
import { Divider } from '@mui/material'

const Dashboard = (props) => {
  return (
    <div className="dashboard">
      <Container>
        <div>
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
        </div>
        <Divider />
        <div>
          <Payroll
            payroll={props.payroll}
            setPayroll={props.setPayroll}
            allEmployees={props.allEmployees}
            setAllEmployees={props.setAllEmployees}
            specificPayroll={props.specificPayroll}
            setSpecificPayroll={props.setSpecificPayroll}
          />
        </div>
        <div>
          <Schedules />
        </div>
        {/* <div>
          <Report />
        </div> */}
      </Container>
    </div>
  )
}

export default Dashboard
