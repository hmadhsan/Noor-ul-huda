import { setupWorker } from "msw"
import { tajweedEnrolmentHandlers } from "./api/enrolments/tajweed/handlers"

console.log("ENV: ", process.env.NODE_ENV)
if (process.env.NODE_ENV === "development") {
  setupWorker(...tajweedEnrolmentHandlers).start()
}
