const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Employee = new Schema(
  {
    name: { type: String, required: true },
    current: { type: Boolean, required: true },
    weekly_hours: { type: Number, required: true },
    associated_pay: { type: Number, required: true },
    taxes: { type: Number, required: true },
    net_pay_per_week: { type: Number, required: true },
    payment_status: { type: Boolean, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('employees', Employee)
