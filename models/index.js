const mongoose = require('mongoose')
const EmployeeSchema = require('./Employee')
const PayRateSchema = require('./Payrate')
const PayRollSchema = require('./Payroll')
const SchedulerSchema = require('./Scheduler')
const StatusSchema = require('./Status')
const TaxSchema = require('./Tax')

const Employee = mongoose.model('employees', EmployeeSchema)
const PayRate = mongoose.model('payrate', PayRateSchema)
const Payroll = mongoose.model('payroll', PayRollSchema)
const Scheduler = mongoose.model('scheduler', SchedulerSchema)
const Status = mongoose.model('status', StatusSchema)
const Tax = mongoose.model('employees', TaxSchema)

module.exports = {
  Employee,
  PayRate,
  Payroll,
  Scheduler,
  Status,
  Tax
}
