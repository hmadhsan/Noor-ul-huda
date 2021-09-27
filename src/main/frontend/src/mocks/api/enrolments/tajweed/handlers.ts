import { rest } from "msw"
import paginate from "jw-paginate"
import { Pageable } from "../../../../components/model/Pageable"
import { TajweedEnrolment } from "../../../../components/enrolment/tajweed/TajweedEnrolment"
import { EnrolmentStatus } from "../../../../components/model/EnrolmentStatus"
import { NEW_TAJWEED_ENROLMENTS } from "./data"
export const tajweedEnrolmentHandlers = [
  rest.get<Pageable<TajweedEnrolment>>("/api/enrolments/tajweed", (req, res, ctx) => {
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
  })
]
