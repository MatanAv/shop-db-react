const express = require("express");
const { PORT } = require("./services/serverConfigurations");

const app = express();

app.use(express.json);

// TODO routes

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}...`));
