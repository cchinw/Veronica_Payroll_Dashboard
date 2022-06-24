const db = require('../db')
const { Employee, Tax, Payroll, WeeklySchedule, PayRate } = require('../models')

// Connect to the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const employee1 = new Employee({
    firstName: 'Zara',
    lastName: 'Naza',
    isCurrent: true
  })
  await employee1.save()

  const employee2 = new Employee({
    firstName: 'Bumbiss',
    lastName: 'Kunbist',
    isCurrent: false
  })
  await employee2.save()

  const rate = new PayRate({
    employeeId: employee1._id,
    hourlyRate: 28
  })
  await rate.save()

  // await Employee.insertMany(employees)
  console.log('Created some employees!')

  const tax = new Tax({
    taxPercentage: 12
  })
  await tax.save()

  const weeklySchedule = new WeeklySchedule({
    employeeId: employee1._id,
    week: 25,
    year: 2022,
    startDate: new Date(2022, 06, 16),
    endDate: new Date(2022, 06, 23),
    totalHours: 60
  })
  await weeklySchedule.save()

  const payroll = new Payroll({
    employeeId: employee1._id,
    weeklyScheduleId: weeklySchedule._id,
    grossAmount: weeklySchedule.totalHours * rate.hourlyRate,
    taxId: tax._id,
    netAmount:
      weeklySchedule.totalHours * rate.hourlyRate -
      weeklySchedule.totalHours * rate.hourlyRate * tax.taxPercentage.toFixed(2)
  })
  await payroll.save()
}
const run = async () => {
  await Employee.deleteMany()
  await Tax.deleteMany()
  await PayRate.deleteMany()
  await WeeklySchedule.deleteMany()
  await Payroll.deleteMany()
  await main()
  db.close()
}

run()
