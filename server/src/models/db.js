import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.resolve("database/negotiation.db");

if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}
const db = new Database(dbPath);

const schema = fs.readFileSync("database/schema.sql", "utf-8");
db.exec(schema);

export default db;
