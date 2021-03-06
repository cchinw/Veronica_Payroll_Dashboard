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

// Router to create Pay Rate
router.post('/payrate', controllers.createPayRate)

// Router to create daily schedule
router.post('/dailyschedule', controllers.createDailySchedule)

//Router for crating schedule

router.post('/schedule', controllers.createSchedule)

// Router to Create weekly  Schedule
router.post('/weeklyschedule', controllers.createWeeklySchedule)

//Router to get all daily schedules
router.get('/dailyschedule', controllers.getAllDailySchedules)

//Router to get all daily schedules
router.get('/weeklyschedule', controllers.getAllWeeklySchedules)

// Router to Update daily Schedule
router.put('/dailyschedule/:id', controllers.updateWeeklySchedule)

// Router to Update weekly Schedule
router.put('/weeklyschedule/:id', controllers.updateWeeklySchedule)

//Router to create new payroll
router.post('/payroll', controllers.createPayroll)

// Router to get all payroll reports
router.get('/payroll', controllers.getAllPayrollReports)

//Get payrolls by week and year
router.get('/payroll/week/:week/year/:year', controllers.getPayrollsByWeek)

// Router to get specific payroll reports
router.get('/payroll/:id', controllers.getPayrollByEmployeeId)

//Router to get Tax Rate
router.get('/tax', controllers.getTaxRate)

// Router to calculate pay
router.put('/pay/:id', controllers.updateWeeklySchedule)

module.exports = router
