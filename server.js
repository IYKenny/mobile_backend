require("dotenv").config();
const express = require('express');
require("./util/db")
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({origin: "*"}))
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.send("eucl apis")
});

app.use("/users", require("./routes/users.routes"))
app.use("/tokens", require("./routes/token"))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})