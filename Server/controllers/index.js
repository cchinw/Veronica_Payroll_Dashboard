const {
  Employee,
  Scheduler,
  Status,
  PayRate,
  Payroll,
  Tax
} = require('../models/index')

const getAllEmployees = async (req, res) => {
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

const addEmployee = async (req, res) => {
  try {
    const employee = await new Employee(req.body)
    await employee.save()
    return res.status(201).json({ employee })
  } catch (error) {
    return res.status(500).json({ error: error.message })
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

const createWeeklySchedule = async (req, res) => {
  try {
    const scheduleId = req.body.id
    const schedule = await new Scheduler.findById(scheduleId)
    const currentStatus = await new Employee(req.body.isCurrent)
    if (currentStatus) {
      return res.status(201).json({ schedule })
    } else {
      res.json({ msg: 'This employee no longer works here!' })
    }
    await schedule.save()
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
}

const updateWeeklySchedule = async (req, res) => {
  try {
    const schedule = await Scheduler.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    )
    res.json(schedule)
  } catch (error) {
    res.send(error.message)
  }
}

const createPayroll = async (req, res) => {
  try {
    const payroll = await new Payroll(req.body)
    await payroll.save()
    res.send(payroll)
  } catch (error) {
    res.send(error.message)
  }
}

const getAllPayrollReports = async (req, res) => {
  try {
    const payroll = await Payroll.find()
    return res.status(201).send(payroll)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getSpecificPayrollReport = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id)
    return res.status(201).send(payroll)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeDetail,
  deleteEmployee,
  createWeeklySchedule,
  updateWeeklySchedule,
  createPayroll,
  getAllPayrollReports,
  getSpecificPayrollReport
}
