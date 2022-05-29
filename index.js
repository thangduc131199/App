require('dotenv').config();
const express = require('express');
const path = require("path");
const { PORT } = require('./config');

//Serial
const {SerialPort} = require("serialport");


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

let startPoint = [105.8200417,20.9772837];

const io = require("socket.io")(server);
io.on('connection', (socket) => {
    console.log('New user connected');

    var port = "/dev/ttyUSB0";
    var serialPort = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 115200 })

    serialPort.on("open", function() {
    console.log("-- Connection opened --");
    serialPort.on("data", function(data_) {
        // console.log(""+data_.toString())
        let data=data_.toString();
        let lat;
        let lon;
        // console.log("ahii"+ data);
        if (data[0]=='s'){
        let s1=data.indexOf('s');
        let s2=data.indexOf(',');
        let s3=data.indexOf('e');
        // let lat_str = data.substring(s1+1,s2);
        // console.log(lat_str);
        lat = parseFloat(data.substring(s1+1,s2));
        lon = parseFloat(data.substring(s2+1,s3));
        startPoint = [lon,lat];
        console.log(lon+ "," + lat);
        }
        // let [x, y] = startPoint;

        // startPoint = [lon,lat];
        // console.log(startPoint);
        io.sockets.emit('new_location', {nextPoint: startPoint});
        
    });

        
    });
    });
    // setInterval(() => {


    //     let lat,lon;
    //     serialPort.on("open", function() {
    //         console.log("-- Connection opened --");
    //         serialPort.on("data", function(data) {
    //             console.log(""+data);
    //             console.log(""+data);
    //           if (data[0]=='s'&&data[data.lenght]=='e'){
    //             let s1=data.indexOf('a');
    //             let s2=data.indexOf(',');
    //             let s3=data.indexOf('s');
    //             lat = parseFloat(data.substring(s1+1,s2-1)).toFixed(7);
    //             lon = parseFloat(data.substring(s2+1,s3-1)).toFixed(7);
    //           }
              
    //         });
    //       });

    //     let [x, y] = startPoint;

    //     startPoint = [lon,lat];
    //     console.log(startPoint);
    //     io.sockets.emit('new_location', {nextPoint: startPoint});
    // }, 1000);
