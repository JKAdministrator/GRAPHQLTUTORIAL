require("dotenv").config();
const colors = require("colors");
const express = require("express");
const { graphQLHTTP, graphqlHTTP } = require("express-graphql");
const PORT = process.env.PORT || 5000;
const app = express();
const schema = require("./schema/schema");
const connectDB = require("./config/db");
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "DEVELOPMENT",
  })
);

app.listen(PORT, async (err) => {
  console.clear();
  if (err) {
    console.log(`Error in server setup: ${err.toString()}`);
  } else {
    await connectDB();
    console.log(`Server listening on Port ${PORT}`);
  }
});