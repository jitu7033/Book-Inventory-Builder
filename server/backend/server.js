import express, { json } from "express";
import dotenv from "dotenv";
import { adminLogger } from "./src/index.js";
import { adminErrorLogger } from "./src/middleware/ErrorLogger.js";
import { patchExpress } from "./src/middleware/patchExpress.js";



const app = express();

app.use(json());
app.use(adminLogger);
app.set("trust proxy", true);
patchExpress(app);

const PORT = 3000;

app.get("/api/getData", async (req, res, next) => {
    throw new Error("here is some issue");
    res.status(500).json({ message: "This is get request" })
})

app.post("/api/post", async (req, res, next) => {
    res.status(200).json({ message: "This is post request" });
})

app.listen(PORT, () => {
    console.log("server started ");
})

app.use(adminErrorLogger)
