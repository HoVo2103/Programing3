function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = random(100);
            if (r < 20) r = 0;
            else if (r < 65) r = 1;
            else if (r < 90) r = 2;
            else if (r < 100) r = 3;
            matrix[y][x] = r;
        }
    }
    var r = Math.round(random(w - 1));
    for (var i in matrix[r]) {
        if (matrix[r][i] == 0) {
            matrix[r][i] = 4;
            break;
        }
    }
    return matrix;
}

var w, h, side, matrix;

function setup() {
    // connection to server
    var socket = io.connect('http://localhost:3000');
    socket.on("initial data for canvas", function (data) {
        w = data.width;
        h = data.height;
        side = data.side;
        matrix = data.matrix;

        createCanvas(side * w, side * h);
        background("#acacac");
        frameRate(5);

        var objForNewPush = { "name": "", "x": "", "y": "" };
        for (var y in matrix) {
            for (var x in matrix[y]) {
                objForNewPush.x = x;
                objForNewPush.y = y;

                if (matrix[y][x] == 1) {
                    // grassArr.push(new Grass(x * 1, y * 1, 1));
                    objForNewPush.name = "grass";
                    socket.emit("push new object", objForNewPush);
                }
                else if (matrix[y][x] == 2) {
                    // grassEaterArr.push(new GrassEater(x * 1, y * 1, 2));
                    objForNewPush.name = "grassEater";
                    socket.emit("push new object", objForNewPush);
                }
                else if (matrix[y][x] == 3) {
                    // predatorArr.push(new Predator(x * 1, y * 1, 3));
                    objForNewPush.name = "predator";
                    socket.emit("push new object", objForNewPush);
                }
                else if (matrix[y][x] == 4) {
                    // virusArr.push(new Virus(x * 1, y * 1, 4));
                    objForNewPush.name = "virus";
                    socket.emit("push new object", objForNewPush);
                }
            }
        }
    });

    // socket.on("get matrix", function (data) {

    // });
}

function draw() {
    // console.log(matrix);
    background("#acacac");

    for (var y in matrix) {
        for (var x in matrix[y]) {
            // normal
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("black");
            }
            // infected grasseater
            else if (matrix[y][x] == 5) {
                fill("#D0D000");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

// setInterval(function () {
//     console.log(matrix);
// }, 1000);