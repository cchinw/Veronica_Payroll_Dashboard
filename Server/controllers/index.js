const e = require('express')
const {
  Employee,
  DailySchedule,
  WeeklySchedule,
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
    console.log(req.params.id, 'EMPLOYEE BY ID')
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
    console.log(req.body, 'REQUEST BODY EMPLOYEE')
    const employee = new Employee(req.body)
    await employee.save()
    return res.status(201).json(employee)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const createPayRate = async (req, res) => {
  try {
    console.log(req.body, 'PAYRATE REQUEST BODY')
    const payrate = new PayRate(req.body)
    await payrate.save()
    return res.status(201).json(payrate)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const updateEmployeeDetail = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.send(employee)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id)
    if (deleted) return res.status(200).send('Employee Deleted')
    throw new Error('Employee not found!')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getAllDailySchedules = async (req, res) => {
  try {
    const dailySchedule = await DailySchedule.find()
    return res.status(201).send(dailySchedule)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getAllWeeklySchedules = async (req, res) => {
  try {
    const dailySchedule = await DailySchedule.find()
    return res.status(201).send(dailySchedule)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const createDailySchedule = async (req, res) => {
  try {
    const employeeId = req.body.employeeId
    const employee = await Employee.findById(employeeId)
    console.log(employee, 'EMPLOYEEEE!!!')
    if (employee) {
      const currentStatus = employee.currentStatus

      if (currentStatus === 'Current Employee') {
        const schedule = await new DailySchedule(req.body)
        return res.status(201).send(schedule)
      } else {
        return res.json({ msg: 'This employee no longer works here!' })
      }
    } else {
      return res.json({ msg: 'This employee does not exist!' })
    }
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
}

const createWeeklySchedule = async (req, res) => {
  try {
    const employeeId = req.body.employeeId
    const employee = await Employee.findById(employeeId)
    if (employee) {
      const currentStatus = employee.currentStatus

      if (currentStatus === 'Current Employee') {
        const schedule = await new WeeklySchedule(req.body)
        return res.status(201).json(schedule)
      } else {
        return res.json({ msg: 'This employee no longer works here!' })
      }
    } else {
      return res.json({ msg: 'This employee does not exist!' })
    }
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
}

//Create schedule
const createSchedule = async (req, res) => {
  try {
    const week = req.body.week
    const year = req.body.year
    const schedule = req.body.schedule

    for await (const weeklySchedule of schedule) {
      let totalHours = 0
      for await (const dailySchedule of weeklySchedule) {
        totalHours += dailySchedule.hours
        new DailySchedule(dailySchedule)
      }
      let data = {
        week: week,
        year: year,
        employeeId: weeklySchedule[0].employeeId,
        startDate: weeklySchedule[0].day,
        endDate: weeklySchedule[6].day,
        totalHours: totalHours
      }
      new WeeklySchedule(data)
    }
    return res.status(201).send('Success created schedules')
  } catch (error) {
    throw error
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

const getPayrollsByWeek = async (req, res) => {
  try {
    const week = parseInt(req.params.week)
    const year = parseInt(req.params.year)
    console.log(week, year)
    const payrolls = []
    const weeks = await WeeklySchedule.find({ week: week, year: year })
    for await (const week of weeks) {
      let payroll = await Payroll.findOne({
        weeklyScheduleId: week._id
      })
      const employee = await Employee.findById(payroll.employeeId)
      const weeklySchedule = await WeeklySchedule.findById(
        payroll.weeklyScheduleId
      )
      const tax = await Tax.findById(payroll.taxId)
      const newPayroll = { payroll, employee, weeklySchedule, tax }
      payrolls.push(newPayroll)
    }

    return res.status(200).json(payrolls)
  } catch (error) {
    throw error
  }
}

const createPayroll = async (req, res) => {
  try {
    const employeeId = req.body.employeeId
    const employee = await Employee.findById(employeeId)
    if (employee) {
      const currentStatus = employee.currentStatus
      let payRate = await PayRate.find({ employeeId: employeeId })
      let rate = payRate.hourlyRate

      if (currentStatus === 'Current Employee') {
        let weeklyScheduleId = req.body.weeklySchedule
        let weeklySchedule = await WeeklySchedule.findById(weeklyScheduleId)
        if (weeklySchedule) {
          let hours = weeklySchedule.totalHours

          let taxId = req.body.taxId
          let tax = await Tax.findById(taxId)
          if (tax) {
            let taxPercentage = tax.taxPercentage

            let grossAmount = hours * rate
            let netAmount = grossAmount - grossAmount * taxPercentage.toFixed(2)
            console.log(netAmount, 'NETAMOUNT!S')

            const payroll = new Payroll()
            payroll.employeeId = employeeId
            payroll.weeklyScheduleId = weeklyScheduleId
            payroll.grossAmount = grossAmount
            payroll.taxId = taxId
            payroll.netAmount = netAmount
            await payroll.save()
          } else {
            return res.json({ msg: 'Invalid request!' })
          }
        } else {
          return res.json({ msg: 'This employee has no status!' })
        }
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
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

const getPayrollByEmployeeId = async (req, res) => {
  try {
    let employee = await Employee.findById(req.params.id)
    const payroll = await Payroll.findById(employee)
    return res.status(201).send(payroll)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getTaxRate = async (req, res) => {
  try {
    const tax = await Tax.find()
    return res.status(201).send(tax)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  addEmployee, // route init
  getAllEmployees, // route init
  getEmployeeById, // route init
  updateEmployeeDetail, // route init
  deleteEmployee, // route init
  createPayRate, //route init
  createDailySchedule, // route init
  createWeeklySchedule, // route init
  getAllDailySchedules,
  getAllWeeklySchedules,
  createSchedule,
  updateDailySchedule, // route init
  updateWeeklySchedule, // route init
  createPayroll, // route init
  getAllPayrollReports, // route init
  getPayrollByEmployeeId, // route init
  getTaxRate, //route init
  getPayrollsByWeek
}
