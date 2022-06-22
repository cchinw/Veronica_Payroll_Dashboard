import './style/App.css'
import axios from 'axios'
import { Routes, Route, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Search from './components/Search'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import EmployeeProfile from './components/EmployeeProfile'
import Schedules from './pages/Schedules'
import Payroll from './pages/Payroll'
import PayrollDetail from './components/PayrollDetail'
import AddEmployee from './pages/AddEmployee'
import CreateSchedule from './pages/CreateSchedule'
import UpdatePayroll from './components/UpdatePayroll'
import Test from './pages/Test'

function App() {
  const BASE_URL = 'http://localhost:3001/api'

  // State for Employees
  const [allEmployees, setAllEmployees] = useState([])
  //get Employee by Id ==> getEmployeeById
  const [employee, setEmployee] = useState(null)
  //update Employee ==> updateEmployee()
  const [employeeUpdate, setEmployeeUpdate] = useState(null)
  //delete Employee ==> deleteEmployee
  const [employeeDelete, setEmployeeDelete] = useState({})

  // Payroll state
  const [payroll, setPayroll] = useState([])
  const [specificPayroll, setSpecificPayroll] = useState({})

  const [allDailySchedule, setAllDailySchedule] = useState({})
  const [allWeeklySchedule, setAllWeeklySchedule] = useState([])

  const getEmployees = async () => {
    let res = await axios.get(`${BASE_URL}/employee`)
    setAllEmployees(res.data)
  }

  // console.log(employee, 'EMPLOYEE')

  useEffect(() => {
    getEmployees()
  }, [])

  return (
    <div className="App">
      <header>
        <Search />
      </header>
      <main style={{ marginLeft: 'auto', marginRight: 0 }}>
        <Routes>
          <Route
            index
            element={
              <Dashboard
                BASE_URL={BASE_URL}
                allEmployees={allEmployees}
                setAllEmployees={setAllEmployees}
                employee={employee}
                setEmployee={setEmployee}
                employeeUpdate={employeeUpdate}
                employeeDelete={employeeDelete}
                setEmployeeUpdate={setEmployeeUpdate}
                setEmployeeDelete={setEmployeeDelete}
                payroll={payroll}
                setPayroll={setPayroll}
                specificPayroll={specificPayroll}
                setSpecificPayroll={setSpecificPayroll}
              />
            }
          />
          <Route
            path="employees"
            element={
              <Employees
                BASE_URL={BASE_URL}
                allEmployees={allEmployees}
                setAllEmployees={setAllEmployees}
                employee={employee}
                setEmployee={setEmployee}
                employeeUpdate={employeeUpdate}
                employeeDelete={employeeDelete}
                setEmployeeUpdate={setEmployeeUpdate}
                setEmployeeDelete={setEmployeeDelete}
              />
            }
          />
          <Route
            path="employee/:id"
            element={
              <EmployeeProfile
                BASE_URL={BASE_URL}
                allEmployees={allEmployees}
                setAllEmployees={setAllEmployees}
                employee={employee}
                setEmployee={setEmployee}
                specificPayroll={specificPayroll}
                setSpecificPayroll={setSpecificPayroll}
              />
            }
          />
          <Route
            path="schedules"
            element={
              <Schedules
                BASE_URL={BASE_URL}
                allEmployees={allEmployees}
                setAllEmployees={setAllEmployees}
                allDailySchedule={allDailySchedule}
                setAllDailySchedule={setAllDailySchedule}
                allWeeklySchedule={allWeeklySchedule}
                setAllWeeklySchedule={setAllWeeklySchedule}
              />
            }
          />
          <Route
            path="payroll"
            element={
              <Payroll
                BASE_URL={BASE_URL}
                payroll={payroll}
                setPayroll={setPayroll}
                allEmployees={allEmployees}
                setAllEmployees={setAllEmployees}
                specificPayroll={specificPayroll}
                setSpecificPayroll={setSpecificPayroll}
              />
            }
          />
          <Route path="report" element={<Payroll BASE_URL={BASE_URL} />} />
          <Route
            path="payroll/:id"
            element={<PayrollDetail BASE_URL={BASE_URL} />}
          />
          <Route
            path="payrollupdate"
            element={
              <UpdatePayroll
                BASE_URL={BASE_URL}
                allEmployees={allEmployees}
                setAllEmployees={setAllEmployees}
              />
            }
          />
          <Route
            path="employee"
            element={<AddEmployee BASE_URL={BASE_URL} />}
          />
          <Route
            path="schedule"
            element={
              <CreateSchedule
                BASE_URL={BASE_URL}
                allEmployees={allEmployees}
                setAllEmployees={setAllEmployees}
              />
            }
          />
          <Route path="test" element={<Test />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
