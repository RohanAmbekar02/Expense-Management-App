const express = require("express");
const router = express.Router();
const Fees = require("../models/fees_details");


router.post('/', async (req, res) => {
  try {
    const { student, courseName, totalFees, paidFees, date } = req.body;

    if (!student || !courseName || !totalFees || !paidFees || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const fee = new Fees({
      student,
      courseName,
      totalFees,
      paidFees,
      date
    });

    await fee.save();

    const populatedFee = await Fees.findById(fee._id).populate("student", "name");

    res.status(201).json(populatedFee);

  } catch (err) {
    console.error('Error adding fee:', err.message);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});



router.get("/", async (req, res) => {
  try {
    const fees = await Fees.find().populate("student" , "name");
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const fee = await Fees.findById(req.params.id)
      .populate("student", "name");
    if (!fee) return res.status(404).json({ message: "Fees record not found" });
    res.json(fee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedFee = await Fees.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    ).populate("student", "name");

    if (!updatedFee) return res.status(404).json({ message: "Fees record not found" });
    res.json(updatedFee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Delete fees by ID ----------------
router.delete("/:id", async (req, res) => {
  try {
    const deletedFee = await Fees.findByIdAndDelete(req.params.id);

    if (!deletedFee) return res.status(404).json({ message: "Fees record not found" });
    res.json({ message: "Fees record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
