import { connect,disconnect } from "mongoose";
import colors from "colors";

export async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
    console.log(colors.green("DB connection successful !"))
  } catch(error) {
    console.log(colors.red(error));
    throw new Error(colors.red("connection failed to DB :("))
  }
}

export async function disconnectFromDatabase() {
  try {
    await disconnect();
    console.log(colors.green("disconnected from DB successfully !"))
  } catch(error) {
    console.log(colors.red("failed to disconnect from DB"));
    throw new Error(colors.red("error in diconnecting from DB"));
  }
}