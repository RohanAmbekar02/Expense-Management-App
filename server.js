const express = require('express');
const connectDb = require('./database/db_connection'); 
const authRoutes = require('./routes/authRoutes');     
const app = express();
const PORT = 8000;

app.use(express.json());

connectDb();

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
