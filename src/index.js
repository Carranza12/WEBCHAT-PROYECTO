const { create } = require("domain");
const express = require("express");
const { createServer } = require("http");
const realtimeServer = require("./realtimeServer");
const path = require("path");
const cookieParser = require("cookie-parser");


const app = express();
const httpServer = createServer(app);

//settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.set('view engine', 'ejs');

//Routes
app.use(require("./routes"))

//public 
app.use(express.static(path.join(__dirname, "public")))

//server
httpServer.listen(app.get("port"), () => {
    console.log('servidor corriendo en el puerto: ', app.get("port"))
})

//realtimeServer
realtimeServer(httpServer);