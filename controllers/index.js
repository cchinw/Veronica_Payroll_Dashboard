const { Employee } = require('../models/index')

const createEmployee = async (req, res) => {
  try {
    const employee = await new Employee(req.body)
    await employee.save()
    return res.status(201).json({ employee })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getEmployees = async (req, res) => {
  try {
    const employee = await Employee.find()
    return res.status(201).send(employee)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getEmployeeById = async (req, res) => {}

module.exports = {
  createEmployee,
  getEmployees
}
