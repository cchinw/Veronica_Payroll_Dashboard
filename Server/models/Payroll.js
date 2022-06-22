const { Schema } = require('mongoose')

const Payroll = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    weeklyScheduleId: {
      type: Schema.Types.ObjectId,
      ref: 'WeeklySchedule',
      required: false
    },
    grossAmount: { type: Number, required: false },
    taxId: { type: Schema.Types.ObjectId, ref: 'Tax', required: true },
    netAmount: { type: Number, required: false }
  },
  { timestamps: true }
)

module.exports = Payroll
