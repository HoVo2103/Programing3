function genMatrix(w, h) {
    var matrix = [];
    for(var y = 0; y < h; y++) {
        matrix[y] = [];
        for(var x = 0; x < w; x++) {
            var r = random(100);
            if     (r < 20) r = 0;
            else if(r < 65) r = 1;
            else if(r < 90) r = 2;
            else if(r < 100)r = 3;
            matrix[y][x] = r;
        }
    }   
    var r = Math.round(random(w - 1));
    for (var i in matrix[r]) {
        if(matrix[r][i] == 0) {
            matrix[r][i] = 4;
            break;
        }              
    }  
    return matrix;
}

var matrix;
var w = 30, h = 30 , side = 24;
var grassArr = [], grassEaterArr = [], predatorArr = [], virusArr = [];

function setup() {
    // connection to server
    var socket = io.connect('http://localhost:3000');
    socket.on("initial data for canvas", function (data) {
        w = data.width;
        h = data.height;
        side = data.side;
        matrix = data.matrix;
    });
    
    createCanvas(side * w, side * h);
    background("#acacac");
    frameRate(5);
    for(var y in matrix) {
        for(var x in matrix[y]) {
            if(matrix[y][x] == 1) {
                grassArr.push(new Grass(x*1, y*1, 1));
            }
            else if(matrix[y][x] == 2) {
                grassEaterArr.push(new GrassEater(x*1, y*1, 2));
            }
            else if(matrix[y][x] == 3) {
                predatorArr.push(new Predator(x*1, y*1, 3))
            }
            else if(matrix[y][x] == 4) {
                virusArr.push(new Virus(x*1, y*1, 4))
            }
        }
    }
}

function draw() {
    // console.log(w + "," + h + "," + side + ",");
    background("#acacac");
}