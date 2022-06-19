import './style/App.css'
import { Routes, Route } from 'react-router-dom'
import Search from './components/Search'
import Dashboard from './pages/Dashboard'
import EmployeeProfile from './components/EmployeeProfile'
import AddEmployee from './components/AddEmployee'

function App() {
  return (
    <div className="App">
      <header>
        <Search />
      </header>
      <main>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="employee" element={<AddEmployee />} />
          <Route path="employee/:id" element={<EmployeeProfile />} />
          <Route />
          <Route />
          <Route />
          <Route />
        </Routes>
      </main>
    </div>
  )
}

export default App
