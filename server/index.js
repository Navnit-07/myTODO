const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser")
const { dbConnect } = require("./db/dbConnect")
const { authRouter } = require("./routes/auth.routes");
const { userRouter } = require("./routes/user.routes");
const todoRoutes = require("./routes/todo.routes");

const app = express();

const PORT = process.env.PORT || 5000;
const allowedOrigins = ['http://localhost:5173']

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));


app.get("/", (req, res) => {
    res.send("Server started successfully!!")
})
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/todos", todoRoutes);

dbConnect()
    .then(() => {
        app.listen(PORT, () => {
        console.log(`app is listening on ${PORT}`);
        })
    })
    .catch(err => {
        console.log('error in db connection in index.js');
    })
