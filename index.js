require('dotenv').config();
const express = require('express');
const path = require("path");
const { PORT } = require('./config');

const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    return res.render("index");
});

server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
});

let startPoint = [103.957908, 22.4978735];

const io = require("socket.io")(server);
io.on('connection', (socket) => {
    console.log('New user connected');
    setInterval(() => {
        let [x, y] = startPoint;
        x += 0.0001;
        y += 0.0001;
        startPoint = [parseFloat(x.toFixed(7)), parseFloat(y.toFixed(7))];
        console.log(startPoint);
        io.sockets.emit('new_location', {nextPoint: startPoint});
    }, 5000);
});
