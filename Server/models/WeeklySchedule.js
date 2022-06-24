const { Schema } = require('mongoose')

const WeeklySchedule = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    week: { type: Number, required: false },
    year: { type: Number, required: false },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    totalHours: { type: Number, required: false }
  },
  { timestamps: true }
)

module.exports = WeeklySchedule
