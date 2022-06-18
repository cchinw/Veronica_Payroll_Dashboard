const db = require('./db')
const Employee = require('./employee')

// Connect to the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const employees = await new Employee({
    name: 'Zara Naza',
    current: true,
    weekly_hours: 60,
    associated_pay: 4800,
    taxes: 1152,
    net_pay_per_week: 3688,
    payment_status: true
  })
  await employees.save()

  // await Employee.insertMany(employees)
  console.log('Created some employees!')
}
const run = async () => {
  await Employee.deleteMany()
  await main()
  db.close()
}

run()
