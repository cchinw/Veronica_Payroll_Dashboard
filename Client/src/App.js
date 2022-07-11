import './style/App.css'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Search from './components/Search'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import EmployeeProfile from './components/EmployeeProfile'
import Schedules from './pages/Schedules'
import Payroll from './pages/Payroll'
import AddEmployee from './pages/AddEmployee'
import CreateSchedule from './pages/CreateSchedule'

function App() {
  const BASE_URL = 'http://localhost:3001/api'

  // State for Employees
  const [allEmployees, setAllEmployees] = useState([])
  //get Employee by Id ==> getEmployeeById

  //update Employee ==> updateEmployee()
  const [employeeUpdate, setEmployeeUpdate] = useState(false)
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

  useEffect(() => {
    getEmployees()
    setEmployeeUpdate(false)
  }, [employeeUpdate])

  return (
    <div className="App">
      <header>
        <Search />
      </header>
      <main style={{ marginLeft: 'auto', marginRight: 0 }}>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                BASE_URL={BASE_URL}
                allEmployees={allEmployees}
                setAllEmployees={setAllEmployees}
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
                employeeUpdate={employeeUpdate}
                employeeDelete={employeeDelete}
                setEmployeeUpdate={setEmployeeUpdate}
                setEmployeeDelete={setEmployeeDelete}
                getEmployees={getEmployees}
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
                specificPayroll={specificPayroll}
                setSpecificPayroll={setSpecificPayroll}
                setEmployeeUpdate={setEmployeeUpdate}
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
          <Route
            path="employee"
            element={
              <AddEmployee BASE_URL={BASE_URL} getEmployees={getEmployees} />
            }
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
        </Routes>
      </main>
    </div>
  )
}

export default App
