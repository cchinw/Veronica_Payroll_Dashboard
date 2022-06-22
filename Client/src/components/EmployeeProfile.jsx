import { Box, Button, Container, TableHead } from '@mui/material'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

const EmployeeProfile = (props) => {
  let { id } = useParams()

  useEffect(() => {
    const getSpecificEmployee = async () => {
      let res = await axios.get(`${props.BASE_URL}/employee/${id}`)
      props.setEmployee(res.data)
    }
    const getSpecificPayroll = async () => {
      let res = await axios.get(`${props.BASE_URL}/payroll/${id}`)
      console.log(res, 'SET SPECIFIC PAYROLL RES')
      props.setSpecificPayroll(res.data)
    }
    getSpecificEmployee()
    getSpecificPayroll()
  }, [])

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
            </div>
          </Container>
        </Box>
      )}
      {/* <Payroll /> */}
    </Container>
  )
}
export default EmployeeProfile
