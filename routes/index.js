const { Router } = require('express')
const controllers = require('../controllers')
const router = Router()

// API Tester
// router.get('/', (req, res) => res.send('Employees init!'))

// Router to get all employees
router.get('/employee', controllers.getEmployees)

//Router to get specific employee by employee id
router.get('/employee/:id', controllers.getEmployeeById)

//Router to create new employee
router.post('/employee', controllers.createEmployee)

// Router to Update Employee
router.put('/employee/:id', controllers.updateEmployeeDetail)

//Router to Delete Employee
router.delete('/employee/:id', controllers.deleteEmployee)

// Router to Create Schedule

// Router to Update Schedule

//Router to Delete Schedule

module.exports = router
