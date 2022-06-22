const mongoose = require('mongoose')
const EmployeeSchema = require('./Employee')
const PayRateSchema = require('./Payrate')
const PayRollSchema = require('./Payroll')
const TaxSchema = require('./Tax')
const DailyScheduleSchema = require('./DailySchedule')
const WeeklyScheduleSchema = require('./WeeklySchedule')

const Employee = mongoose.model('employees', EmployeeSchema)
const PayRate = mongoose.model('payrate', PayRateSchema)
const Payroll = mongoose.model('payroll', PayRollSchema)
const Tax = mongoose.model('tax', TaxSchema)
const DailySchedule = mongoose.model('dailyschedule', DailyScheduleSchema)
const WeeklySchedule = mongoose.model('weeklyschedule', WeeklyScheduleSchema)

module.exports = {
  Employee,
  PayRate,
  Payroll,
  Tax,
  DailySchedule,
  WeeklySchedule
}
