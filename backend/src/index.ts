import app from "./app.js";
import colors from "colors";
import { connectToDatabase } from "./db/dbConnection.js";
import { error } from "console";

const port = process.env.PORT || 5000;
//* database connection
connectToDatabase()
  .then(() => {
    app.listen(port, () =>
      console.log(colors.yellow(`server running on port: ${port}`))
    );
  })
  .catch((error) => console.log(colors.red(error)));
