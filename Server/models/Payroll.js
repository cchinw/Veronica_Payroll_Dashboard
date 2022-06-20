const { Schema } = require('mongoose')

const Payroll = new Schema(
  {
    employeeId: [
      { type: Schema.Types.ObjectId, ref: 'Employee', required: true }
    ],
    isCurrent: {
      type: Schema.Types.ObjectId,
      ref: 'Status',
      required: true
    },
    weeklySchedule: {
      type: Schema.Types.ObjectId,
      ref: 'WeeklySchedule',
      required: true
    },
    payRate: [{ type: Schema.Types.ObjectId, ref: 'Payrate', required: true }],
    grossAmount: { type: Number, required: true },
    taxes: [{ type: Schema.Types.ObjectId, ref: 'Tax', required: true }],
    netAmount: { type: Number, required: true },
    isPaid: { type: Boolean, required: true }
  },
  { timestamps: true }
)

module.exports = Payroll
