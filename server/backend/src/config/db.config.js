import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// path to squalite file 
const dbPath = path.join(__dirname, "../config/database.sqlite");
console.log(dbPath);

// open database connection 

export const db = new Database(dbPath);

// enable foregin key 

db.pragma('foreign_keys = ON');

console.log("sqlite databse initilized at ", dbPath);