const { Schema } = require('mongoose')

const Tax = new Schema(
  {
    taxPercentage: { type: Number, required: false }
  },
  { timestamps: true }
)

module.exports = Tax
