import { db } from "../config/db.config.js";
import '../schema/setup.schema.js'


// add default admin first 

// const insert = db.prepare('INSERT OR IGNORE INTO admins (email, password) VALUES (?, ?)');
// insert.run('admin@example.com', 'test123');

const admin = db.prepare('select * from admins').all();

const logs = db.prepare('select * from logs').all();

console.log("logs ", logs);
const tableName = 'logs'

const columns = db.prepare(`PRAGMA table_info(${tableName});`).all();
// console.log(columns);

// console.log(admin);