const { Schema } = require('mongoose')

const DailySchedule = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    day: { type: Date, required: false },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    hours: { type: Number, required: false }
  },
  { timestamps: true }
)

module.exports = DailySchedule
