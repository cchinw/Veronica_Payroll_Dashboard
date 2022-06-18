const mongoose = require('mongoose')
const EmployeeSchema = require('./Employee')

const Employee = mongoose.model('employees', EmployeeSchema)

module.exports = {
  Employee
}
