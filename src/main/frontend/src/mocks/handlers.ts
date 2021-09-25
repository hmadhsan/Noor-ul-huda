import { rest } from "msw"
import { Pageable } from "../components/model/Pageable"
import { format, add } from "date-fns"
import paginate from "jw-paginate"
import { TajweedEnrolment } from "../components/enrolment/tajweed/TajweedEnrolment"

interface TajweedRequestParams {
  page: number
  size: number
}

const enrolments: TajweedEnrolment[] = [
  {
    id: "1",
    name: "Mohammad Khan",
    contactNo: "0406000000",
    suburb: "NOBLE PARK",
    submissionDate: format(new Date(), "dd/MM/yyyy")
  },
  {
    id: "2",
    name: "Hasnain Javed",
    contactNo: "0406111111",
    suburb: "NOBLE PARK",
    submissionDate: format(new Date(), "dd/MM/yyyy")
  },
  {
    id: "3",
    name: "Rizwan Muzammil",
    contactNo: "0406222222",
    suburb: "DANDENONG",
    submissionDate: format(add(new Date(), { days: 1 }), "dd/MM/yyyy")
  },
  {
    id: "4",
    name: "Muazzam Mushtaq",
    contactNo: "0406333333",
    suburb: "PAKENHAM",
    submissionDate: format(add(new Date(), { days: 3 }), "dd/MM/yyyy")
  },
  {
    id: "5",
    name: "Mudaser Syed",
    contactNo: "0406444444",
    suburb: "KEYSBOROUGH",
    submissionDate: format(add(new Date(), { days: 4 }), "dd/MM/yyyy")
  },
  {
    id: "6",
    name: "Ali Aziz",
    contactNo: "0406555555",
    suburb: "CLYDE",
    submissionDate: format(add(new Date(), { days: 5 }), "dd/MM/yyyy")
  }
]

export const handlers = [
  rest.get<undefined, Pageable<TajweedEnrolment>, TajweedRequestParams>(
    "/api/enrolments/tajweed",
    (req, res, ctx) => {
      const pageNumber = Number(req.url.searchParams.get("page"))
      const pageSize = Number(req.url.searchParams.get("size"))

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

      return res(ctx.delay(1000), ctx.status(200), ctx.json(paged))
    }
  )
]
