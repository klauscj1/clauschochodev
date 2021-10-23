const express = require("express");

require("dotenv").config();

//Create express server
const app = express();

//CORS
const cors = require("cors");
app.use(cors());

//Public directory
app.use(express.static("public"));

//Read and parse json
app.use(express.json());

//Routes config
app.use("/clauschochodev/api/auth", require("./routes/auth"));
app.use("/clauschochodev/api/type_task", require("./routes/type_task"));
app.use("/clauschochodev/api/project", require("./routes/project"));
app.use("/clauschochodev/api/task", require("./routes/task"));

//Listen requests
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
