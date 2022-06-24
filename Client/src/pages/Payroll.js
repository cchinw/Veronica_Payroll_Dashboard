import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
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

  const handleWeekChange = (e) => {
    setWeek(e.target.value)
  }

  const handleYearChange = (e) => {
    setYear(e.target.value)
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            PAYROLL
          </Typography>
          <Typography variant="h4" component="div">
            {/* Button to navigate to page to create a new employee payroll (I did
            not get the the time to finish this up) */}
            <Button
              size="medium"
              onClick={() => {
                // navigate('/dashboard')
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

                    <th>Current Employee</th>

                    <th>Hours Worked (per week)</th>

                    <th>Gross Amount</th>

                    <th>Taxes</th>

                    <th>Net Amount</th>
                  </tr>
                  {payrolls &&
                    payrolls.map((payroll) => (
                      <tr>
                        <th>
                          {payroll.employee.firstName}{' '}
                          {payroll.employee.lastName}
                        </th>

                        <th>{payroll.employee.currentStatus}</th>
                        <th>{payroll.weeklySchedule.totalHours}</th>
                        <th>{payroll.payroll.grossAmount}</th>
                        <th>{payroll.tax.taxPercentage}%</th>
                        <th>{payroll.payroll.netAmount}</th>
                      </tr>
                    ))}
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
