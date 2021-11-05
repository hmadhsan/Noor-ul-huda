import { setupWorker } from "msw"
import { tajweedEnrolmentHandlers } from "./api/enrolments/tajweed/handlers"
import { hifthEnrolmentHandlers } from "./api/enrolments/hifth/handlers"
console.log("ENV: ", process.env.NODE_ENV)
if (process.env.NODE_ENV === "development") {
  setupWorker(...tajweedEnrolmentHandlers, ...hifthEnrolmentHandlers).start()
}
