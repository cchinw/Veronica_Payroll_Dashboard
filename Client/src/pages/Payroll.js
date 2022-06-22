import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import { Container, Divider, Button } from '@mui/material'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'

const Payroll = (props) => {
  let navigate = useNavigate()

  const getAllPayroll = async () => {
    let res = await axios.get(`${props.BASE_URL}/payroll`)
    props.setPayroll(res.data)
    console.log(res.data, ' All Payroll')
  }

  useEffect(() => {
    getAllPayroll()
  }, [])

  console.log(props.allEmployees, 'EMPLOYEE PROPS')

  return (
    <div className="payroll">
      <h1>PAYROLL</h1>
      <div>
        <Button
          onClick={() => {
            navigate('/employee')
          }}
        >
          <AccountBalanceIcon />
          Create New Payroll
        </Button>
      </div>
      <Container>
        {props.payroll.map((pay) => (
          <Container>
            <Divider />
            <div key={pay.id} onClick={() => navigate(`payroll/${pay._id}`)}>
              <h4>Employee Id: {pay.employeeId}</h4>
              <h4>Hours Worked (per week): {pay.weeklyHours}</h4>
              <h4>Gross Amount: {pay.grossAmount} </h4>
              <h4>Taxes: {pay.taxes}</h4>
              <h4>Net Amount Paid per week: {pay.netAmount} </h4>
            </div>
            <Divider />
          </Container>
        ))}
      </Container>
    </div>
  )
}

export default Payroll
