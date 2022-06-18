const db = require('../db')
const { Employee } = require('../models')

// Connect to the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const employee1 = new Employee({
    name: 'Zara Naza',
    current: true,
    weekly_hours: 60,
    associated_pay: 4800,
    taxes: 1152,
    net_pay_per_week: 3688,
    payment_status: true
  })
  await employee1.save()

  const employee2 = new Employee({
    name: 'Chizara Chinaza',
    current: true,
    weekly_hours: 40,
    associated_pay: 7000,
    taxes: 1152,
    net_pay_per_week: 3688,
    payment_status: true
  })
  await employee2.save()

  // await Employee.insertMany(employees)
  console.log('Created some employees!')
}
const run = async () => {
  await Employee.deleteMany()
  await main()
  db.close()
}

run()
