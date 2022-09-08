require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const express = require("express");
const { graphQLHTTP, graphqlHTTP } = require("express-graphql");
const PORT = process.env.PORT || 5000;
const app = express();
const bodyParser = require("body-parser");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const cloudinary = require("cloudinary");

app.use(cors());
app.use(bodyParser({ limit: "50MB" }));
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
    try {
      console.log(`Server listening on Port ${PORT}`);
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      console.log(`Cloudinary configured OK`);
      console.log(`Cloudinary CLOUD: ${process.env.CLOUDINARY_CLOUD_NAME}`);
      console.log(`Cloudinary API KEY: ${process.env.CLOUDINARY_API_KEY}`);
      await connectDB();
      console.log(`GraphQL test: localhost:${PORT}/graphql`);
      console.log(`To see the datbase use the app MongoDB Compass`);
    } catch (e) {
      console.log("ERROR", { e });
      throw e;
    }
  }
});
