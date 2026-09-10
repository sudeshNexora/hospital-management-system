import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Databse Connected"));

  // Strip any trailing slashes and, if the URI already ends in a db name,
  // don't double it up — this prevents "prescripto/prescripto"-style
  // malformed namespaces if MONGODB_URI in .env already includes a path.
  const baseUri = (process.env.MONGODB_URI || "").replace(/\/+$/, "");
  const uri = baseUri.endsWith("/prescripto") ? baseUri : `${baseUri}/prescripto`;

  await mongoose.connect(uri);
};

export default connectDB;