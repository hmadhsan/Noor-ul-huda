import { DefaultRequestBody, rest } from "msw"
import paginate from "jw-paginate"
import { Pageable } from "../../../../components/model/Pageable"
import { TajweedEnrolment } from "../../../../components/enrolment/tajweed/TajweedEnrolment"
import { EnrolmentStatus } from "../../../../components/model/EnrolmentStatus"
import { NEW_TAJWEED_ENROLMENTS } from "./data"
import { ApproveTajweedForm } from "../../../../components/enrolment/tajweed/approve/ApproveTajweedForm"
import { ErrorType, ServerError } from "../../../../apiClient"

export interface UpdateTajweedEnrolmentRequestParams {
  id: string
}

export interface CancelTajweedEnrolmentRequestParams {
  id: string
}

const SERVER_ERROR_500: ServerError = {
  type: ErrorType.ERROR,
  message: "There was an error processing your request"
}

const SERVER_ERROR_422: ServerError = {
  type: ErrorType.VALIDATION_FAILED,
  message: "Invalid request payload",
  violations: [
    {
      field: "name",
      messages: ["Name should be in capital letters"]
    }
  ]
}

export const tajweedEnrolmentHandlers = [
  rest.get<Pageable<TajweedEnrolment>>("/api/enrolment/tajweed", (req, res, ctx) => {
    const status = req.url.searchParams.get("status")!
    const pageNumber = Number(req.url.searchParams.get("page"))
    const pageSize = Number(req.url.searchParams.get("size"))

    const enrolments = []

    switch (status) {
      case EnrolmentStatus.SUBMITTED:
        enrolments.push(...NEW_TAJWEED_ENROLMENTS)
    }

    const pageable = paginate(enrolments.length, pageNumber + 1, pageSize)
    const chunk = enrolments.slice(pageable.startIndex, pageable.endIndex + 1)

    const paged: Pageable<TajweedEnrolment> = {
      items: chunk,
      pageNumber: pageable.currentPage - 1,
      pageSize: pageable.pageSize,
      totalPages: pageable.totalPages,
      totalDocuments: pageable.totalItems,
      firstPage: pageable.currentPage === 1,
      lastPage: pageable.currentPage === pageable.totalPages
    }

    return res(ctx.delay(500), ctx.status(200), ctx.json(paged))
  }),
  rest.put<ApproveTajweedForm, ServerError, UpdateTajweedEnrolmentRequestParams>(
    "/api/enrolment/tajweed/:id",
    (req, res, ctx) => {
      const { id } = req.params

      switch (id) {
        case "1":
          return res(ctx.delay(1000), ctx.status(204), ctx.set("Content-Type", "application/json"))
        case "2":
          return res(ctx.delay(1000), ctx.status(422), ctx.json(SERVER_ERROR_422))
        default:
          return res(ctx.delay(1000), ctx.status(500), ctx.json(SERVER_ERROR_500))
      }
    }
  ),
  rest.delete<DefaultRequestBody, ServerError, CancelTajweedEnrolmentRequestParams>(
    "/api/enrolment/tajweed/:id",
    (req, res, ctx) => {
      const { id } = req.params

      switch (id) {
        case "1":
          return res(ctx.delay(1000), ctx.status(204), ctx.set("Content-Type", "application/json"))
        default:
          return res(ctx.delay(1000), ctx.status(500), ctx.json(SERVER_ERROR_500))
      }
    }
  )
]
