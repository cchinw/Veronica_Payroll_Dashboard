const { Schema } = require('mongoose')

const PayRate = new Schema(
  {
    employeeId: [
      { type: Schema.Types.ObjectId, ref: 'Employee', required: true }
    ],
    hourlyRate: { type: Number, required: false },
    dateEffective: { type: Date, required: true }
  },
  { timestamps: true }
)

module.exports = PayRate
