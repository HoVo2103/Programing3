var fs = require("fs");
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("public"));

// Paths
app.get("/", function (req, res) {
    res.redirect("index.html");
});
// Redirect to google
app.get("/google", function (req, res) {
    res.redirect("https://google.com");
});

app.get("/google/search/:q", function (req, res) {
    var q = req.params.q;
    res.redirect("https://google.com/search?q=" + q);
});
// Error
app.get("/*", function (req, res) {
    res.send("<div style='padding: 10px; background: red; color: white;'> <h1> Sorry </h1> <h2> 404 - The page cannot be found </h2> </div>");
});

server.listen(3000, function () {
    console.log("App is running on port 3000");
});

// part of the game
function my_random(max, min = 0) {
    if (Number.isInteger(min) && Number.isInteger(max)) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

function gen_matrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = my_random(100);
            if      (r < 20) r = 0;
            else if (r < 65) r = 1;
            else if (r < 90) r = 2;
            else if (r < 100) r = 3;
            matrix[y][x] = r;
        }
    }
    var r = my_random(w - 1);
    for (var i in matrix[r]) {
        if (matrix[r][i] == 0) {
            matrix[r][i] = 4;
            break;
        }
    }
    return matrix;
}

var w = 30;
var h = 30;
var side = 24;
var matrix = gen_matrix(w, h);
var grassArr = [], grassEaterArr = [], predatorArr = [], virusArr = [];

var objForSend = {
    "width": w,
    "height": h,
    "side": side,
    "matrix": matrix
};

// server & client contact
io.on("connection", function (socket) {
    io.sockets.emit("initial data for canvas", objForSend);

    var clrText;
    setInterval(function () {
        for (var y in matrix) {
            for (var x in matrix[y]) {
                // normal
                if (matrix[y][x] == 0) {
                    // fill("#acacac");
                }
                else if (matrix[y][x] == 1) {
                    // fill("green");
                }
                else if (matrix[y][x] == 2) {
                    // fill("yellow");
                }
                else if (matrix[y][x] == 3) {
                    // fill("red");
                }
                else if (matrix[y][x] == 4) {
                    // fill("black");
                }
                // infected grasseater
                else if (matrix[y][x] == 5) {
                    // fill("#D0D000");
                }
                // rect(x * side, y * side, side, side);
            }
        }
    
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    
        for (var i in grassEaterArr) {
            grassEaterArr[i].mul();
            grassEaterArr[i].eat();
            grassEaterArr[i].die();
        }
    
        for (var i in predatorArr) {
            predatorArr[i].mul();
            predatorArr[i].eat();
            predatorArr[i].die();
        }
    
        for (var i in virusArr) {
            virusArr[i].mul();
            virusArr[i].infect();
            virusArr[i].die();
        }
    }, 200);
});