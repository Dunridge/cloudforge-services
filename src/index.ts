import { connectToDatabase } from "./database/connectToDB";
import router from "./routes/apiRoutes";
// import router from "./routes/apiRoutes";

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const appOrigin = "http://localhost:3001";

app.use(cors({ origin: appOrigin })); 
app.use(express.json());

// TODO: add a route and a function determineWhetherRFQ
connectToDatabase().then(() => {
    console.log("DB connected!");
    app.use("/api", router);
    app.listen(port, () => {
        console.log("Server is running");
    });
});