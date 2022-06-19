const { Schema } = require('mongoose')

const Payroll = new Schema(
  {
    employeeId: [
      { type: Schema.Types.ObjectId, ref: 'Employee', required: true }
    ],
    isCurrent: { type: Boolean, required: true },
    weekOf: {
      type: Schema.Types.ObjectId,
      ref: 'WeeklySchedule',
      required: true
    },
    hourlyRate: { type: Number, required: false },
    overtime: { type: Number, required: false },
    grossAmount: { type: Number, required: true }, //total hours worked * weekly schedule hours
    taxes: { type: Number, required: true },
    netAmount: { type: Number, required: true },
    isPaid: { type: Boolean, required: true }
  },
  { timestamps: true }
)

module.exports = Payroll
