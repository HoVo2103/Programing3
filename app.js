var fs = require("fs");
var express = require("express");
var app = express();

app.use(express.static("public"));

// Paths
app.get("/", function (req, res) {
    res.redirect("public");
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

app.listen(3000, function () {
    console.log("App is running on port 3000");
});

// Main part
var obj = {
    "first_name": "Vardan",
    "last_name": "Hovsepyan",
    "age": 13,
    "tumo_student": true
};

function main() {
    fs.writeFile("obj.json", JSON.stringify(obj, null, "\t"), function () {
        console.log("obj.json created.");
    });
}

main();