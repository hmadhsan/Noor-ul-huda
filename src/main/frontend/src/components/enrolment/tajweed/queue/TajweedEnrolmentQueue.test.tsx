import { setupServer } from "msw/node"
import { rest } from "msw"
import { screen, waitForElementToBeRemoved, within } from "@testing-library/react"
import { renderWithQueryClient } from "../../../../test-utils"
import { TajweedEnrolmentQueue } from "./TajweedEnrolmentQueue"
import { TajweedEnrolment } from "../TajweedEnrolment"
import { setLogger } from "react-query"
import { Pageable } from "../../../model/Pageable"
import userEvent from "@testing-library/user-event"
import { EnrolmentStatus } from "../../../model/EnrolmentStatus"
import { ErrorType, ServerError } from "../../../../apiClient"

const NEW_TAJWEED_ENROLMENTS: TajweedEnrolment[] = [
  {
    id: "1",
    name: "B",
    contactNumber: "0406111112",
    email: "b@test.com",
    occupation: "ABC",
    enrolmentReason: "Reason 1",
    applicantSignature: "B",
    address: {
      street: "1 Test Street",
      suburb: "D",
      postcode: "3174",
      state: "VIC"
    },
    submissionDate: "26/09/2021",
    marketingMethod: "test",
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "2",
    name: "A",
    contactNumber: "0406111111",
    email: "a@test.com",
    occupation: "DEF",
    enrolmentReason: "Reason 2",
    applicantSignature: "A",
    address: {
      street: "1 Test Street",
      suburb: "C",
      postcode: "3174",
      state: "VIC"
    },
    submissionDate: "27/09/2021",
    marketingMethod: "test",
    status: EnrolmentStatus.SUBMITTED
  }
]

const server = setupServer()

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test("should display tabs", () => {
  giveSuccessfullResponse([])

  renderWithQueryClient(<TajweedEnrolmentQueue />)

  expect(screen.getByRole("tab", { name: /new/i })).toBeInTheDocument()
  expect(screen.getByRole("tab", { name: /pending/i })).toBeInTheDocument()
  expect(screen.getByRole("tab", { name: /confirmed/i })).toBeInTheDocument()
  expect(screen.getByRole("tab", { name: /enroled/i })).toBeInTheDocument()
})

test.each`
  tab      | tooltip
  ${"new"} | ${"new placement requests"}
`(
  "should display and hide tooltip for tabs",
  async ({ tab, tooltip }: { tab: string; tooltip: string }) => {
    giveSuccessfullResponse([])

    const tabRegex = new RegExp(tab, "i")
    const tooltipRegex = new RegExp(tooltip, "i")

    renderWithQueryClient(<TajweedEnrolmentQueue />)

    userEvent.hover(screen.getByRole("tab", { name: tabRegex }))

    expect(await screen.findByText(tooltipRegex)).toBeInTheDocument()

    userEvent.unhover(screen.getByRole("tab", { name: tabRegex }))

    await waitForElementToBeRemoved(await screen.findByText(tooltipRegex))

    expect(screen.queryByText(tooltipRegex)).not.toBeInTheDocument()
  }
)

test("should have new submissions tab selected by default", () => {
  giveSuccessfullResponse([])

  renderWithQueryClient(<TajweedEnrolmentQueue />)

  expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(/new/i)
  expect(screen.getByRole("tab", { selected: false, name: /pending/i })).toBeInTheDocument()
  expect(screen.getByRole("tab", { selected: false, name: /confirmed/i })).toBeInTheDocument()
  expect(screen.getByRole("tab", { selected: false, name: /enroled/i })).toBeInTheDocument()
})

test("table should display columns", async () => {
  giveSuccessfullResponse([])

  renderWithQueryClient(<TajweedEnrolmentQueue />)

  await waitForElementToBeRemoved(await screen.findByText(/loading/i))

  const row = within(screen.getAllByRole("rowgroup")[0]).getAllByRole("row")
  const columns = within(row[0]).getAllByRole("columnheader")

  expect(columns).toHaveLength(5)
  expect(columns[0]).toHaveTextContent(/name/i)
  expect(columns[1]).toHaveTextContent(/contact no/i)
  expect(columns[2]).toHaveTextContent(/suburb/i)
  expect(columns[3]).toHaveTextContent(/submission date/i)
  expect(columns[4]).toHaveTextContent(/action/i)
})

test("table should display row", async () => {
  giveSuccessfullResponse(NEW_TAJWEED_ENROLMENTS.slice(0, 1))

  renderWithQueryClient(<TajweedEnrolmentQueue />)

  await waitForElementToBeRemoved(await screen.findByText(/loading/i))

  const row = within(screen.getAllByRole("rowgroup")[1]).getAllByRole("row")
  const columns = within(row[0]).getAllByRole("cell")

  expect(columns).toHaveLength(5)
  expect(columns[0]).toHaveTextContent("B")
  expect(columns[1]).toHaveTextContent("0406111112")
  expect(columns[2]).toHaveTextContent("D")
  expect(columns[3]).toHaveTextContent("26/09/2021")
  expect(columns[4]).toHaveTextContent(/view/i)
})

test("should display error message", async () => {
  setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {}
  })

  const config = {
    queries: {
      retry: false
    }
  }

  giveErrorResponse()

  renderWithQueryClient(<TajweedEnrolmentQueue />, config)

  await waitForElementToBeRemoved(await screen.findByText(/loading/i))

  expect(screen.getByRole("alert")).toHaveTextContent(/there was an error processing your request/i)
})

const giveSuccessfullResponse = (response: TajweedEnrolment[]) => {
  const paged: Pageable<TajweedEnrolment> = {
    items: response,
    pageNumber: 0,
    pageSize: 1,
    totalPages: 1,
    totalDocuments: 2,
    firstPage: true,
    lastPage: true
  }

  server.use(
    rest.get("/api/enrolment/tajweed", async (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json(paged))
    })
  )
}

const giveErrorResponse = () => {
  const error: ServerError = {
    type: ErrorType.ERROR
  }

  server.use(
    rest.get("/api/enrolment/tajweed", async (req, res, ctx) => {
      return res.once(ctx.status(500), ctx.json(error))
    })
  )
}
