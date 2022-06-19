const { Router } = require('express')
const controllers = require('../controllers')
const router = Router()

// API Tester
// router.get('/', (req, res) => res.send('Employees init!'))

// Router to get all employees
router.get('/employee', controllers.getAllEmployees)

//Router to get specific employee by employee id
router.get('/employee/:id', controllers.getEmployeeById)

//Router to create new employee
router.post('/employee', controllers.addEmployee)

// Router to Update Employee
router.put('/employee/:id', controllers.updateEmployeeDetail)

//Router to Delete Employee
router.delete('/employee/:id', controllers.deleteEmployee)

// Router to Create Schedule
router.post('/schedule', controllers.createWeeklySchedule)

// Router to Update Schedule
router.put('/schedule/:id', controllers.updateWeeklySchedule)

//Router to Delete Schedule

//Router to create new payroll
router.post('/payroll', controllers.createPayroll)

// Router to get all payroll reports
router.get('/payroll', controllers.getAllPayrollReports)

// Router to get specific payroll reports
router.get('/payroll/:id', controllers.getSpecificPayrollReport)

module.exports = router
