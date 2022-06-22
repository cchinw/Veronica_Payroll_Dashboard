const db = require('../db')
const { Employee, Tax } = require('../models')

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

  // await Employee.insertMany(employees)
  console.log('Created some employees!')

  const tax = new Tax({
    taxPercentage: 0.12
  })
  await tax.save()
}
const run = async () => {
  await Employee.deleteMany()
  await Tax.deleteMany()
  await main()
  db.close()
}

run()
