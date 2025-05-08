const express = require('express');
const cors = require('cors');

require('dotenv').config();
require('./config/db');

const useroutes = require('./routes/Routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api',useroutes);



const PORT = process.env.PORT || 3000;



// Import the database connection
app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);
    
});

