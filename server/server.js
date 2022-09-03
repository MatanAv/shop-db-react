const express = require("express");
const cors = require("cors");
const { PORT } = require("./services/serverConfigurations");
const { router: productsRouter } = require("./routes/products");
const { router: reciptsRouter } = require("./routes/recipts");
const { router: customerRouter } = require("./routes/customer");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/products", productsRouter);
app.use("/api/recipts", reciptsRouter);
app.use("/api/customers", customerRouter);

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}...`));
