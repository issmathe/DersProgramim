const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const database = require('./database.js');
const denemeRoute=require("./routes/deneme.js") 
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");
const logger = require("morgan");

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://dersprogramim-1.onrender.com/'],
  credentials: true,
}));
app.use(logger("dev"));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;
 
app.use("/api",denemeRoute)
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
database()
  console.log(`Server is running on port ${PORT}`);
});