const db = require('../db')
const { Employee, Status, Tax } = require('../models')

// Connect to the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const status1 = new Status({
    isCurrent: true
  })
  await status1.save()

  const status2 = new Status({
    isCurrent: true
  })
  await status2.save()

  const employee1 = new Employee({
    firstName: 'Zara',
    lastName: 'Naza',
    isCurrent: status1._id
  })
  await employee1.save()

  const employee2 = new Employee({
    firstName: 'Bumbiss',
    lastName: 'Kunbist',
    isCurrent: status2._id
  })
  await employee2.save()

  // await Employee.insertMany(employees)
  console.log('Created some employees!')

  const tax = new Tax({
    taxPercentage: 12,
    isActive: true
  })
  await tax.save()
}
const run = async () => {
  await Employee.deleteMany()
  await Status.deleteMany()
  await Tax.deleteMany()
  await main()
  db.close()
}

run()
