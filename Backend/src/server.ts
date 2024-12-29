import app from "./app"
import { config } from "./config"
import { setupDatabase } from "./utils/database-manager"

setupDatabase()

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
})
