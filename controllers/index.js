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

const getEmployeeById = async (req, res) => {
  try {
    let employee = await Employee.findById(req.params.id)
    if (employee) return res.status(201).send(employee)
    return res
      .status(404)
      .send('Employee with the specified ID does not exists')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const updateEmployeeDetail = async (req, res) => {
  try {
    const { id } = req.params
    await Employee.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
      (err, employee) => {
        if (err) {
          res.status(500).send(err)
        }
        if (!employee) {
          res.status(500).send('Employee not found!')
        }
        return res.status(200).json(employee)
      }
    )
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Employee.findByIdAndDelete(id)
    if (deleted) return res.status(200).send('Employee Deleted')
    throw new Error('Employee not found!')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployeeDetail,
  deleteEmployee
}
