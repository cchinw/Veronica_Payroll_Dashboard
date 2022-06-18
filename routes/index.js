const { Router } = require('express')
const controllers = require('../controllers')
const router = Router()

router.get('/', (req, res) => res.send('Employees init!'))

router.post('/employee', controllers.createEmployee)
router.get('/employee', controllers.getEmployees)

module.exports = router
