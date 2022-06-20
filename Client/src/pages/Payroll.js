import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import { Container } from '@mui/material'

const Payroll = (props) => {
  const { id } = useParams()
  let navigate = useNavigate()

  const getAllPayroll = async () => {
    let res = await axios.get(`${props.BASE_URL}/payroll`)
    props.setPayroll(res.data)
    console.log(res.data, ' All Payroll')
  }

  useEffect(() => {
    getAllPayroll()
  }, [])

  // const getSpecificPayroll = async () => {
  //   let res = await axios.get(`${props.BASE_URL}/employee/${id}`)
  //   props.setSpecificPayroll(res.data)
  //   console.log(res, 'Specific Payroll')
  // }

  // useEffect(() => {
  //   getSpecificPayroll()
  //   navigate(`/payroll/${id}`)
  // }, [])

  return (
    <div className="payroll">
      <h1>PAYROLL</h1>
      <Container>
        {props.payroll.map((pay) => {
          ;<div></div>
        })}
      </Container>
    </div>
  )
}

export default Payroll
