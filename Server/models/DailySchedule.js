const { Schema } = require('mongoose')

const DailySchedule = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    day: { type: Date, required: false },
    startTime: { type: Number, required: true },
    endTime: { type: Number, required: true },
    hours: { type: Number, required: false }
  },
  { timestamps: true }
)

module.exports = DailySchedule
