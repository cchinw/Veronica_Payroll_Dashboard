const { Schema } = require('mongoose')

const WeeklySchedule = new Schema(
  {
    employeeId: [
      { type: Schema.Types.ObjectId, ref: 'Employee', required: true }
    ],
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    daysWorked: [
      { type: Schema.Types.ObjectId, ref: 'DailySchedule', required: true }
    ],
    totalHoursWorked: { type: Number, required: false }
  },
  { timestamps: true }
)

module.exports = WeeklySchedule
