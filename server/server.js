const express = require("express");
const { PORT } = require("./services/serverConfigurations");
const { router: productsRouter } = require("./routes/products");
const { router: reciptsRouter } = require("./routes/recipts");

const app = express();

app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/recipts", reciptsRouter);

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}...`));
