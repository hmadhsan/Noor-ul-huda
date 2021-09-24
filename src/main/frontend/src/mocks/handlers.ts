import { rest } from "msw"
import { TajweedEnrolment } from "../components/enrolment/tajweed/TajweedEnrolmentQueue"
import PaginatedList from "../components/table/PaginatedList"
import { format, add } from "date-fns"

interface TajweedRequestParams {
  page: number
  size: number
}

const enrolments = [
  {
    name: "Mohammad Khan",
    contactNo: "0406000000",
    suburb: "NOBLE PARK",
    submissionDate: format(new Date(), "dd/MM/yyyy")
  },
  {
    name: "Hasnain Javed",
    contactNo: "0406111111",
    suburb: "NOBLE PARK",
    submissionDate: format(new Date(), "dd/MM/yyyy")
  },
  {
    name: "Rizwan Muzammil",
    contactNo: "0406222222",
    suburb: "DANDENONG",
    submissionDate: format(add(new Date(), { days: 1 }), "dd/MM/yyyy")
  },
  {
    name: "Muazzam Mushtaq",
    contactNo: "0406333333",
    suburb: "PAKENHAM",
    submissionDate: format(add(new Date(), { days: 3 }), "dd/MM/yyyy")
  },
  {
    name: "Mudaser Syed",
    contactNo: "0406444444",
    suburb: "KEYSBOROUGH",
    submissionDate: format(add(new Date(), { days: 4 }), "dd/MM/yyyy")
  },
  {
    name: "Ali Aziz",
    contactNo: "0406555555",
    suburb: "CLYDE",
    submissionDate: format(add(new Date(), { days: 5 }), "dd/MM/yyyy")
  }
]

const countItems = (map: Map<any, any[]>): number => [...Array.from(map.values())].flat().length

export const handlers = [
  rest.get<undefined, PaginatedList<TajweedEnrolment>, TajweedRequestParams>(
    "/api/enrolments/tajweed",
    (req, res, ctx) => {
      const pageNumber = Number(req.url.searchParams.get("page"))
      const pageSize = Number(req.url.searchParams.get("size"))

      const pageable = new Map<number, TajweedEnrolment[]>()

      if (pageSize === 5) {
        pageable.set(0, enrolments.slice(0, enrolments.length - 1))
        pageable.set(1, enrolments.slice(enrolments.length - 1))
      } else {
        pageable.set(pageNumber, enrolments)
      }

      const totalDocuments = countItems(pageable)
      const totalPages = Math.ceil(totalDocuments / pageSize)

      const firstPage = pageSize > 5 ? true : pageNumber + 1 < totalPages
      const lastPage = pageSize > 5 ? true : !firstPage

      const paged: PaginatedList<TajweedEnrolment> = {
        items: pageable.get(pageNumber)!,
        pageNumber,
        pageSize,
        totalPages,
        totalDocuments,
        firstPage,
        lastPage
      }

      return res(ctx.delay(1000), ctx.status(200), ctx.json(paged))
    }
  )
]
