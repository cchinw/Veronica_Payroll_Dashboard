const db = require('../db')
const { Employee, Status } = require('../models')

// Connect to the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const employee1 = new Employee({
    firstName: 'Zara',
    lastName: 'Naza'
  })
  await employee1.save()

  const employee2 = new Employee({
    firstName: 'Bumbiss',
    lastName: 'Kunbist'
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
