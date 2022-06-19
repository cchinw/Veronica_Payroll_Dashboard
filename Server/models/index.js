const mongoose = require('mongoose')
const EmployeeSchema = require('./Employee')
const PayRateSchema = require('./Payrate')
const PayRollSchema = require('./Payroll')
const SchedulerSchema = require('./WeeklySchedule')
const StatusSchema = require('./Status')
const TaxSchema = require('./Tax')
const DailyScheduleSchema = require('./DailySchedule')

const Employee = mongoose.model('employees', EmployeeSchema)
const PayRate = mongoose.model('payrate', PayRateSchema)
const Payroll = mongoose.model('payroll', PayRollSchema)
const Scheduler = mongoose.model('scheduler', SchedulerSchema)
const Status = mongoose.model('status', StatusSchema)
const Tax = mongoose.model('tax', TaxSchema)
const DailySchedule = mongoose.model('dailyschedule', DailyScheduleSchema)

module.exports = {
  Employee,
  PayRate,
  Payroll,
  Scheduler,
  Status,
  Tax,
  DailySchedule
}
