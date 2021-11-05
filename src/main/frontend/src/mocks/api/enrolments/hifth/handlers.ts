import { rest } from "msw"
import paginate from "jw-paginate"
import { Pageable } from "../../../../components/model/Pageable"
import { HifthEnrolment } from "../../../../components/enrolment/hifth/HifthEnrolment"
import { EnrolmentStatus } from "../../../../components/model/EnrolmentStatus"
import { NEW_HIFTH_ENROLMENTS } from "./data"
export const hifthEnrolmentHandlers = [
  rest.get<Pageable<HifthEnrolment>>("/api/enrolment/hifth", (req, res, ctx) => {
    const status = req.url.searchParams.get("status")!
    const pageNumber = Number(req.url.searchParams.get("page"))
    const pageSize = Number(req.url.searchParams.get("size"))

    const enrolments = []

    switch (status) {
      case EnrolmentStatus.SUBMITTED:
        enrolments.push(...NEW_HIFTH_ENROLMENTS)
    }

    const pageable = paginate(enrolments.length, pageNumber + 1, pageSize)
    const chunk = enrolments.slice(pageable.startIndex, pageable.endIndex + 1)

    const paged: Pageable<HifthEnrolment> = {
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
