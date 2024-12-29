import dotenv from "dotenv"
import path from "path"

dotenv.config()

export const config = {
    port: process.env.PORT || 3000,
    databaseRoot: process.env.DATABASE_ROOT || path.join(__dirname, "..", "..", "database"),
}
