const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require('./models');

//Routers
const dormRouter = require('./routes/Dorms');
app.use("/dorms", dormRouter);
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server running on port 3001");
    });
});


