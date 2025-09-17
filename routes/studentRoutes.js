const express = require("express");
const router = express.Router();
const Student = require("../models/student_list");

    
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.json(savedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } 
    );
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
