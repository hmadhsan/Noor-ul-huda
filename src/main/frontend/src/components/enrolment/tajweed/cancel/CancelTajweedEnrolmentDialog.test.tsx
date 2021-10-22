import { setupServer } from "msw/node"
import { rest } from "msw"
import { screen, waitForElementToBeRemoved, within } from "@testing-library/react"
import { renderWithQueryClient } from "../../../../test-utils"
import { setLogger } from "react-query"
import userEvent from "@testing-library/user-event"
import { ErrorType, ServerError } from "../../../../apiClient"
import { CancelTajweedEnrolmentDialog } from "./CancelTajweedEnrolmentDialog"

const ENROLMENT_ID: string = "1"

const server = setupServer()

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test("should display cancel button", () => {
  renderWithQueryClient(
    <CancelTajweedEnrolmentDialog enrolmentId={ENROLMENT_ID} onConfirmationSuccess={jest.fn()} />
  )

  expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
})

test("should open dialog", () => {
  renderWithQueryClient(
    <CancelTajweedEnrolmentDialog enrolmentId={ENROLMENT_ID} onConfirmationSuccess={jest.fn()} />
  )

  userEvent.click(screen.getByRole("button", { name: /cancel/i }))

  expect(screen.getByRole("banner")).toBeInTheDocument()
  expect(
    screen.getByText(/"are you sure \? you can't undo this action afterwards\."/i)
  ).toBeInTheDocument()
  within(screen.getByRole("alertdialog", { name: /"cancel enrolment \?"/i })).getByRole("button", {
    name: /close/i
  })
  expect(screen.getByRole("button", { name: /confirm/i })).toBeInTheDocument()
})

test("should close dialog", async () => {
  renderWithQueryClient(
    <CancelTajweedEnrolmentDialog enrolmentId={ENROLMENT_ID} onConfirmationSuccess={jest.fn()} />
  )

  userEvent.click(screen.getByRole("button", { name: /cancel/i }))

  const alertdialog = screen.getByRole("alertdialog")

  userEvent.click(within(alertdialog).getByRole("button", { name: /close/i }))

  await waitForElementToBeRemoved(alertdialog)

  expect(alertdialog).not.toBeInTheDocument()
})

test("should display error message when cancel enrolment fails", async () => {
  const onConfirmationSuccess = jest.fn()

  giveErrorResponse()

  renderWithQueryClient(
    <CancelTajweedEnrolmentDialog
      enrolmentId={ENROLMENT_ID}
      onConfirmationSuccess={onConfirmationSuccess}
    />
  )

  userEvent.click(screen.getByRole("button", { name: /cancel/i }))

  const alertdialog = screen.getByRole("alertdialog")

  userEvent.click(within(alertdialog).getByRole("button", { name: /confirm/i }))

  // TODO: resolve the assertion (bug?)
  // expect(within(alertdialog).getByRole("button", { name: /close/i })).toBeDisabled()

  await waitForElementToBeRemoved(await screen.findByText(/loading/i))

  expect(screen.getByText(/there was an error processing your request/i)).toBeInTheDocument()

  expect(onConfirmationSuccess).not.toHaveBeenCalled()
})

test("should cancel enrolment", async () => {
  const onConfirmationSuccess = jest.fn()

  giveSuccessResponse()

  renderWithQueryClient(
    <CancelTajweedEnrolmentDialog
      enrolmentId={ENROLMENT_ID}
      onConfirmationSuccess={onConfirmationSuccess}
    />
  )

  userEvent.click(screen.getByRole("button", { name: /cancel/i }))

  const alertdialog = screen.getByRole("alertdialog")

  userEvent.click(within(alertdialog).getByRole("button", { name: /confirm/i }))

  // TODO: resolve the assertion (bug?)
  // expect(within(alertdialog).getByRole("button", { name: /close/i })).toBeDisabled()

  await waitForElementToBeRemoved(await screen.findByText(/loading/i))

  expect(onConfirmationSuccess).toHaveBeenCalledTimes(1)
})

const giveErrorResponse = () => {
  setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {}
  })

  server.use(
    rest.delete<any, ServerError>("/api/enrolment/tajweed/:id", (req, res, ctx) => {
      const error: ServerError = {
        type: ErrorType.ERROR,
        message: "There was an error processing your request"
      }
      return res(ctx.status(500), ctx.json(error))
    })
  )
}

const giveSuccessResponse = () => {
  server.use(
    rest.delete("/api/enrolment/tajweed/:id", (req, res, ctx) => {
      return res(ctx.status(204), ctx.set("Content-Type", "application/json"))
    })
  )
}
