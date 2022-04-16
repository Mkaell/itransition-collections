const express = require("express");
const cors = require("cors");
const path = require('path')
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();

app.use(express.json({ limit: "50mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));




