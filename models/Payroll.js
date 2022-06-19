const { Schema } = require('mongoose')

const Payroll = new Schema(
  {
    employeeId: [
      { type: Schema.Types.ObjectId, ref: 'Employee', required: true }
    ],
    isCurrent: [{ type: Schema.Types.ObjectId, ref: 'Status', required: true }],
    weeklyHours: { type: Number, required: true },
    grossAmount: { type: Number, required: true },
    taxes: { type: Number, required: true },
    netAmount: { type: Number, required: true },
    isPaid: { type: Boolean, required: true }
  },
  { timestamps: true }
)

module.exports = Payroll
