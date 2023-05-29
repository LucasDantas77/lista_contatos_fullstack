import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database conected!");
    app.listen(5173, () => {
      console.log("server is running!");
    });
  })
  .catch((error) => {
    console.log(error);
  });
