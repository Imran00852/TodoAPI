import mongoose from "mongoose";

//db connection
export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "TodoDB",
    })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};
