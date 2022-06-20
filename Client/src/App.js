import './style/App.css'
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

function App() {
  const BASE_URL = 'http://localhost:3001/api'

  // State for Employees
  const [allEmployees, setAllEmployees] = useState([])
  //get Employee by Id ==> getEmployeeById
  const [specificEmployee, setSpecificEmployee] = useState({
    firstNmae: '',
    lastName: '',
    isCurrent: false
  })
  //update Employee ==> updateEmployee()
  const [employeeUpdate, setEmployeeUpdate] = useState(null)
  //delete Employee ==> deleteEmployee
  const [employeeDelete, setEmployeeDelete] = useState({})

  return (
    <div className="App">
      <header>
        <Search />
      </header>
      <main style={{ marginLeft: 'auto', marginRight: 0 }}>
        <Routes>
          <Route index element={<Dashboard BASE_URL={BASE_URL} />} />
          <Route
            path="employees"
            element={
              <Employees
                BASE_URL={BASE_URL}
                allEmployees={allEmployees}
                setAllEmployees={setAllEmployees}
                specificEmployee={specificEmployee}
                setSpecificEmployee={setSpecificEmployee}
                employeeUpdate={employeeUpdate}
                employeeDelete={employeeDelete}
                setEmployeeUpdate={setEmployeeUpdate}
                setEmployeeDelete={setEmployeeDelete}
              />
            }
          />
          <Route
            path="employee/:id"
            element={<EmployeeProfile BASE_URL={BASE_URL} />}
          />
          <Route path="schedules" element={<Schedules BASE_URL={BASE_URL} />} />
          <Route path="payroll" element={<Payroll BASE_URL={BASE_URL} />} />
          <Route path="report" element={<Payroll BASE_URL={BASE_URL} />} />
          <Route
            path="payroll/:id"
            element={<PayrollDetail BASE_URL={BASE_URL} />}
          />
          <Route
            path="employee"
            element={<AddEmployee BASE_URL={BASE_URL} />}
          />
          <Route
            path="schedule"
            element={<CreateSchedule BASE_URL={BASE_URL} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
