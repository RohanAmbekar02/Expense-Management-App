const mongoose = require("mongoose");

const feesSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  courseName: { type: String, required: true },
  paidFees: { type: Number, required: true },
  remainingFees: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Fees", feesSchema);
