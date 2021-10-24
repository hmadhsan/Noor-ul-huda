import format from "date-fns/format"
import { ServerError } from "../apiClient"
// import { UseFormSetError } from "react-hook-form"

export interface SetErrorCallback {
  // TODO: Figure out why fieldName type can not be string ?
  (
    fieldName: any,
    error: { type: string; message: string },
    options?: {
      shouldFocus: boolean
    }
  ): void
}

export const addServerErrors = (error: ServerError, setError: SetErrorCallback): void => {
  error.violations?.forEach((violation) => {
    setError(
      violation.field,
      { type: "server", message: violation.messages.join("\n") },
      { shouldFocus: true }
    )
  })
}

export const MOBILE_OR_LANDLINE_REGEX: RegExp = /^04[\d]{2}[\d]{6}$|^0[2|3|7|8][\d]{8}$/

export const toISO8601Date = (date: Date): Date => new Date(format(date, "yyyy-MM-dd"))

export const STATES = new Map<string, string>()
STATES.set("vic", "Victoria")
STATES.set("nsw", "New South Wales")
STATES.set("act", "Australian Capital Territory")
STATES.set("wa", "Western Australia")
STATES.set("qld", "Queensland")
STATES.set("nt", "Northern Territory")
STATES.set("sa", "South Australia")
STATES.set("tas", "Tasmania")
