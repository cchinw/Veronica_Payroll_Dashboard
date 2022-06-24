import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'

const PayrollDetail = (props) => {
  const { id } = useParams()
  let navigate = useNavigate()

  const [singlePayroll, setSinglePayroll] = useState(null)

  const getPayrollDetail = async () => {
    const res = await axios.get(`${props.BASE_URL}/employee/${id}`)
    console.log(res, 'PAYROLL DETAIL RES')
    setSinglePayroll(res.data)
  }

  useEffect(() => {
    getPayrollDetail()
  }, [])

  return <div></div>
}

export default PayrollDetail
