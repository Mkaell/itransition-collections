const express = require("express");
const cors = require("cors");
const path = require('path')
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.js');
const usersRouter = require('./routes/users.js');
const collectionRouter = require('./routes/collections.js');
const itemsRouter = require('./routes/items.js');
const homePageRouter = require('./routes/homePage.js');
const searchRouter = require('./routes/search.js');
const cloudinary = require('cloudinary').v2
require('dotenv').config()

const app = express();

cloudinary.config({ 
    cloud_name: 'de3v3rkv6', 
    api_key: '982239126755269', 
    api_secret: 'ndowqBMhlouTbkHM2E3bfjLRebg' 
});

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use('/auth', authRouter);
app.use('/', homePageRouter);
app.use('/search', searchRouter);
app.use('/users', usersRouter);
app.use('/collections', collectionRouter);
app.use('/items', itemsRouter);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

mongoose.connect(process.env.CONNECTION_URL,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => server)
  .catch((error) => console.log(`${error} did not connect`));


require("./socketIo/")(server);
