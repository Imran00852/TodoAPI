import mongoose from "mongoose";

//db connection
export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "TodoDB",
    })
    .then((c) => {
      console.log(c.connection.host);
    })
    .catch((err) => {
      console.log(err);
    });
};
