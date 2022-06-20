const {
  Employee,
  DailySchedule,
  WeeklySchedule,
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

const createPayRate = async (req, res) => {
  try {
    const payrate = await new PayRate(req.body)
    await payrate.save()
    return res.status(201).json({ payrate })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const createStatus = async (req, res) => {
  try {
    const status = await new Status(req.body)
    await status.save()
    return res.status(201).json({ status })
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

const createDailySchedule = async (req, res) => {
  try {
    const scheduleId = req.body.id
    const schedule = await new DailySchedule.findById(scheduleId)
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

const createWeeklySchedule = async (req, res) => {
  try {
    const scheduleId = req.body.id
    const schedule = await new WeeklySchedule.findById(scheduleId)
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

const updateDailySchedule = async (req, res) => {
  try {
    const schedule = await DailySchedule.findByIdAndUpdate(
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

const updateWeeklySchedule = async (req, res) => {
  try {
    const schedule = await WeeklySchedule.findByIdAndUpdate(
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
    return res.status(201).json({ payroll })
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

const calculatePay = async (req, res) => {
  try {
    const payroll = await new Payroll.findById(req.params.id)
    const pay = await new Payroll(req.body)

    let grossAmount = []
    let hours = payroll.weeklySchedule.totalHoursWorked
    let rate = payroll.payRate.hourlyRate
    let gross = hours * rate
    grossAmount.push(gross)

    let netAmount = []
    let tax = payroll.taxes.taxPercentage
    let net = gross - tax
    netAmount.push(net)

    await Payroll.findByIdAndUpdate(payroll, {
      grossAmount: [...payroll.grossAmount],
      netAmount: [...payroll.netAmount, payroll._id]
    })
    await pay.save()
    console.log(pay, 'PAYYYYYY')
    return res.status(201).json(pay)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  addEmployee, // route init
  getAllEmployees, // route init
  getEmployeeById, // route init
  updateEmployeeDetail, // route init
  deleteEmployee, // route init
  createPayRate,
  createStatus,
  createDailySchedule,
  createWeeklySchedule,
  updateDailySchedule,
  updateWeeklySchedule,
  createPayroll,
  getAllPayrollReports,
  getSpecificPayrollReport,
  calculatePay
}
