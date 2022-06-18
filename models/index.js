const mongoose = require('mongoose')
const EmployeeSchema = require('./Employee')

const Employee = mongoose.model('employee', EmployeeSchema)

module.exports = {
  Employee
}
