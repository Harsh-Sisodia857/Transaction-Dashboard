const express = require('express')
const app = express()
const cors = require("cors");
const connectDatabase = require('./db')
const port = 4000;


connectDatabase();
app.use(cors());
app.use(express.json())


app.use('/api/', require('./Routes/index.js'));

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})