const mongoose = require("mongoose");

const feesSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  courseName: { type: String, required: true },
  totalFees: { type: Number, required: true },
  paidFees: { type: Number, required: true },
  remainingFees: { type: Number}, 
  date: { type: Date, required: true }
});

feesSchema.pre("validate", function(next) {
  const total = Number(this.totalFees) || 0;
  const paid = Number(this.paidFees) || 0;
  this.remainingFees = total - paid;
  next();
});



 

feesSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update) {
    const total = Number(update.totalFees ?? update.$set?.totalFees ?? NaN);
    const paid = Number(update.paidFees ?? update.$set?.paidFees ?? NaN);
    if (!isNaN(total) && !isNaN(paid)) {
      if (!update.$set) update.$set = {};
      update.$set.remainingFees = total - paid;
    }
  }
  next();
});

module.exports = mongoose.model("Fees", feesSchema);
