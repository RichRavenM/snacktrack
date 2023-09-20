const express = require("express");
const app = express();
const {
  getBusinesses,
  getBusinessById,
} = require("./controllers/business-controllers");
const {
  handle400s,
  handle404s,
  handleServerError,
} = require("./controllers/error-controllers");
const { getEndpoints } = require("./controllers/api-controllers");
const {getCustomers, getCustomerById} = require("./controllers/customers-controllers");

app.use(express.json());

app.get("/api", getEndpoints);
app.get("/api/businesses", getBusinesses);
app.get("/api/businesses/:_id", getBusinessById);

app.get("/api/customers", getCustomers)
app.get("/api/customers/:_id", getCustomerById)

app.use((req, res) => {
  res.status(404).send({ msg: "url not found" });
});

app.use(handle400s)

app.use(handle404s);

app.use(handleServerError);

module.exports = app;