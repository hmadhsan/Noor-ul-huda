export enum ErrorType {
  NOT_FOUND = "NOT_FOUND",
  VALIDATION_FAILED = "VALIDATION_FAILED",
  ERROR = "ERROR"
}

export interface Violation {
  field: string
  messages: string[]
}

export interface ServerError {
  type: ErrorType
  message?: string
  violations?: Violation[]
}

export type NoContent = {}

const GENERIC_ERROR: ServerError = {
  type: ErrorType.ERROR,
  message: "There was an error processing your request"
}

const NOT_FOUND_ERROR: ServerError = {
  type: ErrorType.NOT_FOUND
}

export enum FetchMethod {
  POST = "POST",
  PUT = "PUT",
  GET = "GET",
  DELETE = "DELETE"
}

type ValidationError = Pick<ServerError, "message" | "violations">

async function handleResponse<T>(response: Response): Promise<T | ServerError> {
  if (response.headers.get("Content-Type") !== "application/json") {
    return Promise.reject<ServerError>(GENERIC_ERROR)
  }

  if (response.ok) {
    return response.status === 204
      ? Promise.resolve<T>({} as T)
      : Promise.resolve<T>((await response.json()) as T)
  }

  switch (response.status) {
    case 404:
      return Promise.reject(NOT_FOUND_ERROR)
    case 422: {
      const validationError = (await response.json()) as ValidationError
      const error: ServerError = {
        type: ErrorType.VALIDATION_FAILED,
        violations: validationError.violations,
        message: "Work on the fields above and try submitting again"
      }

      return Promise.reject<ServerError>(error)
    }
    default:
      return Promise.reject<ServerError>(GENERIC_ERROR)
  }
}

const isServerError = (response: any): response is ServerError =>
  response && (response as ServerError).type !== undefined

export const doFetch = async <T>(
  url: string,
  method: FetchMethod,
  body: object | null = null
): Promise<T> => {
  const response = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null
  }).then<T | ServerError>(handleResponse)

  if (isServerError(response)) {
    throw response
  }

  return Promise.resolve(response)
}
