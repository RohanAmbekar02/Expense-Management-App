const express = require('express');
const connectDb = require('./database/db_connection'); 
const authRoutes = require('./routes/authRoutes');    
const studentRoutes = require('./routes/studentRoutes');
const feesRoutes = require('./routes/feesRoutes'); 
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
}));

connectDb();

app.use('/api/auth', authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/fees", feesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
