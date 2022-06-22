import { Box, Button, Container, Divider, TableHead } from '@mui/material'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

const EmployeeProfile = (props) => {
  let { id } = useParams()

  useEffect(() => {
    const getSpecificEmployee = async () => {
      let employeeProfileRes = await axios.get(
        `${props.BASE_URL}/employee/${id}`
      )
      let payrollRes = await axios.get(`${props.BASE_URL}/payroll/${id}`)
      props.setEmployee(employeeProfileRes.data)
      props.setSpecificPayroll(payrollRes.data)
    }
    getSpecificEmployee()
  }, [])

  console.log(props.specificPayroll, 'SPECIFIC PAYROLL')

  return (
    <Container>
      <Button>Click me!</Button>
      {props.employee && (
        <Box>
          <Container>
            <div>
              <h2>Profile</h2>
              <h4>
                Employee Full Name:{' '}
                {props.employee.firstName + ' ' + props.employee.lastName}
              </h4>
              <h4>Current Employee: {props.employee.isCurrent}</h4>
              <Divider />
              <div>
                <h2>Employee Payroll</h2>
              </div>
              <Divider />
              <div>
                <h2>WeeklySchedule</h2>
              </div>
            </div>
          </Container>
        </Box>
      )}
      {/* <Payroll /> */}
    </Container>
  )
}
export default EmployeeProfile
