const express = require("express");
const app = express();
const PORT = 6010;
const api = require("./routers/api");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// routing
app.use("/api", api);

// -------------------
app.get("/", (req, res) => {
    res.send("Hello, Nodejs!");
});

app.listen(PORT, () => {
    console.log(`~~~~~ Listening to on PORT: ${PORT} ~~~~~`);
});
