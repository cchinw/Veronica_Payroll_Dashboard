import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import {
  Container,
  Divider,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  ButtonGroup
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'

const Payroll = (props) => {
  let navigate = useNavigate()

  const [week, setWeek] = useState(25)
  const [year, setYear] = useState(new Date().getFullYear())
  const [payrolls, setPayrolls] = useState(null)

  const getAllPayroll = async () => {
    let res = await axios.get(
      `${props.BASE_URL}/payroll/week/${week}/year/${year}`
    )
    setPayrolls(res.data)
  }

  useEffect(() => {
    getAllPayroll()
  }, [])

  const [payrollFormFields, setPayrollFormFields] = useState({
    employeeId: '',
    weeklyHours: '',
    grossAmount: 0,
    taxes: 0,
    netAmount: 0
  })

  const handlePayrollChange = (e) => {
    setPayrollFormFields({
      ...payrollFormFields,
      [e.target.name]: e.target.value
    })
  }

  const handleSelected = (payroll) => {
    setPayrollFormFields(payroll)
  }

  const handleWeekChange = (e) => {
    setWeek(e.target.value)
  }

  const handleYearChange = (e) => {
    setYear(e.target.value)
  }
  console.log(payrolls, 'Payrolls')
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            PAYROLL
          </Typography>
          <Typography variant="h4" component="div">
            <Button
              size="medium"
              onClick={() => {
                navigate('/dashboard')
              }}
            >
              <AccountBalanceIcon />
              Create New Payroll
            </Button>
          </Typography>
          <Typography variant="body">
            <Container>
              <Divider />
              <div>
                <table>
                  <tr>
                    <th>
                      Week
                      <input
                        type="text"
                        min={1}
                        max={53}
                        value={week}
                        onChange={handleWeekChange}
                      />
                      Year
                      <input
                        type="text"
                        value={year}
                        onChange={handleYearChange}
                      />
                    </th>
                    <Divider />
                    <th>Current Employee</th>
                    <Divider />
                    <th>Hours Worked (per week)</th>
                    <Divider />
                    <th>Hours Worked (per week)</th>
                    <Divider />
                    <th>Gross Amount</th>
                    <Divider />
                    <th>Taxes</th>
                    <Divider />
                    <th>Net Amount</th>
                    <Divider />
                  </tr>

                  <tr>
                    {payrolls &&
                      payrolls.map((payroll) => (
                        <tr>
                          <th>
                            {payroll.employee.firstName}{' '}
                            {payroll.employee.lastName}
                          </th>
                          <th>{payroll.employee.isCurrent.toString()}</th>
                          <th>{payroll.weeklySchedule.totalHours}</th>
                          <th>{payroll.payroll.grossAmount}</th>
                          <th>{payroll.tax.taxPercentage}%</th>
                          <th>{payroll.payroll.netAmount}</th>
                        </tr>
                      ))}
                  </tr>
                </table>
              </div>
              <ButtonGroup>
                <Button>
                  <DeleteIcon />
                </Button>
                <Button>
                  <EditIcon />
                </Button>
              </ButtonGroup>
              <Divider />
            </Container>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Payroll
