import mongoose from "mongoose";

export const connectToDB = async (connectionString: string) => {
  try {
    await mongoose.connect(connectionString);
    console.log("Succesfully connected to DB...");
  } catch (error) {
    console.log("Could not connect to DB: ", error);
  }
};
