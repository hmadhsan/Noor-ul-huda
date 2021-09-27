import { setupServer } from "msw/node"
import { rest } from "msw"
import { screen, waitForElementToBeRemoved } from "@testing-library/react"
import { renderWithClient } from "../../../test-utils"
import { TajweedEnrolmentQueue } from "./TajweedEnrolmentQueue"
import { TajweedEnrolment } from "./TajweedEnrolment"
import { QueryClient, setLogger } from "react-query"
import { Pageable } from "../../model/Pageable"
import userEvent from "@testing-library/user-event"
import { EnrolmentStatus } from "../../model/EnrolmentStatus"
import { ErrorType, ServerError } from "../../../apiClient"

const NEW_TAJWEED_ENROLMENTS: TajweedEnrolment[] = [
  {
    id: "1",
    name: "B",
    contactNo: "0406111112",
    suburb: "D",
    submissionDate: "26/09/2021",
    status: EnrolmentStatus.SUBMITTED
  },
  {
    id: "2",
    name: "A",
    contactNo: "0406111111",
    suburb: "C",
    submissionDate: "27/09/2021",
    status: EnrolmentStatus.SUBMITTED
  }
]

const server = setupServer()

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test("should display tabs", () => {
  giveSuccessfullResponse([])

  renderWithClient(new QueryClient(), <TajweedEnrolmentQueue />)

  expect(screen.getByRole("tab", { name: /new/i })).toBeInTheDocument()
  expect(screen.getByRole("tab", { name: /pending/i })).toBeInTheDocument()
  expect(screen.getByRole("tab", { name: /confirmed/i })).toBeInTheDocument()
  expect(screen.getByRole("tab", { name: /finalized/i })).toBeInTheDocument()
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

    renderWithClient(new QueryClient(), <TajweedEnrolmentQueue />)

    userEvent.hover(screen.getByRole("tab", { name: tabRegex }))

    expect(await screen.findByText(tooltipRegex)).toBeInTheDocument()

    userEvent.unhover(screen.getByRole("tab", { name: tabRegex }))

    await waitForElementToBeRemoved(await screen.findByText(tooltipRegex))

    expect(screen.queryByText(tooltipRegex)).not.toBeInTheDocument()
  }
)

test("should have new submissions tab selected by default", () => {
  giveSuccessfullResponse([])

  renderWithClient(new QueryClient(), <TajweedEnrolmentQueue />)

  expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(/new/i)
  expect(screen.getByRole("tab", { selected: false, name: /pending/i })).toBeInTheDocument()
  expect(screen.getByRole("tab", { selected: false, name: /confirmed/i })).toBeInTheDocument()
  expect(screen.getByRole("tab", { selected: false, name: /finalized/i })).toBeInTheDocument()
})

test("should not sort column by submission date", async () => {
  giveSuccessfullResponse(NEW_TAJWEED_ENROLMENTS.slice(0, 2))

  renderWithClient(new QueryClient(), <TajweedEnrolmentQueue />)

  await waitForElementToBeRemoved(await screen.findByText(/loading/i))

  userEvent.click(screen.getByText(/submission date/i))

  expect(screen.queryByTestId("sort-icon-asc")).not.toBeInTheDocument()
  expect(screen.queryByTestId("sort-icon-desc")).not.toBeInTheDocument()
})

test("should display error message", async () => {
  setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {}
  })

  giveErrorResponse()

  renderWithClient(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        }
      }
    }),
    <TajweedEnrolmentQueue />
  )

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