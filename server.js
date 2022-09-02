const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const planRouter = require('./routes/api/plans')
const topicRouter = require('./routes/api/topics')
require('dotenv').config()
const DB_URI = process.env.MONGO_URI
const port = process.env.PORT || 5000;
const cors = require('cors');

//database connection
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(res => console.log('mongoDB connected...'))
    .catch(err => console.log(err))


//middleware
app.use(cors({
    origin: "*"
}))

app.use(express.json())
app.use('/api/plans', planRouter)
app.use('/api/topics', topicRouter)

app.get('/', (req, res) => {
    var options = {
        root: path.join(__dirname)
    };

    var fileName = 'msg.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
})

// serve static assets if in production

// server
app.listen(port, () => {
    console.log(`Listening on the port: ${port}`);
});