import { setupWorker } from "msw"
import { handlers } from "./handlers"

console.log("ENV: ", process.env.NODE_ENV)
if (process.env.NODE_ENV === "development") {
  setupWorker(...handlers).start()
}
