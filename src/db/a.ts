import fs from "fs";
import path from "path";
import { pool } from "./services"; // wherever your pool is

export function importDump() {
  const sqlPath = path.join(process.cwd(), "backup.sql"); // adjust name/path
  const dump = fs.readFileSync(sqlPath, "utf8");

  pool.query(dump, (err) => {
    if (err) {
      console.error("❌ Error importing dump:", err);
    } else {
      console.log("✅ Dump imported successfully");
    }
  });
}

// call it once somewhere after pool is created:
// importDump();
