//import mongoose to connect to mongo DB
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDb connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
