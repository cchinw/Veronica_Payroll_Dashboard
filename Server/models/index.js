const mongoose = require('mongoose')
const EmployeeSchema = require('./Employee')
const PayRateSchema = require('./Payrate')
const PayRollSchema = require('./Payroll')
const StatusSchema = require('./Status')
const TaxSchema = require('./Tax')
const DailyScheduleSchema = require('./DailySchedule')
const WeeklyScheduleSchema = require('./WeeklySchedule')

const Employee = mongoose.model('employees', EmployeeSchema)
const PayRate = mongoose.model('payrate', PayRateSchema)
const Payroll = mongoose.model('payroll', PayRollSchema)
const Status = mongoose.model('status', StatusSchema)
const Tax = mongoose.model('tax', TaxSchema)
const DailySchedule = mongoose.model('dailyschedule', DailyScheduleSchema)
const WeeklySchedule = mongoose.model('weeklyschedule', WeeklyScheduleSchema)

module.exports = {
  Employee,
  PayRate,
  Payroll,
  Status,
  Tax,
  DailySchedule,
  WeeklySchedule
}
