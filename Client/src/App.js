import './style/App.css'
import { Routes, Route } from 'react-router-dom'
import Search from './components/Search'
import Dashboard from './pages/Dashboard'
import Employees from './components/Employees'
import EmployeeProfile from './components/EmployeeProfile'
import Schedules from './components/Schedules'
import Payroll from './components/Payroll'
import PayrollDetail from './components/PayrollDetail'
import AddEmployee from './components/AddEmployee'
import CreateSchedule from './components/CreateSchedule'

function App() {
  return (
    <div className="App">
      <header>
        <Search />
      </header>
      <main>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="employee/:id" element={<EmployeeProfile />} />
          <Route path="schedules" element={<Schedules />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="payroll/:id" element={<PayrollDetail />} />
          <Route path="employee" element={<AddEmployee />} />
          <Route path="schedule" element={<CreateSchedule />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
