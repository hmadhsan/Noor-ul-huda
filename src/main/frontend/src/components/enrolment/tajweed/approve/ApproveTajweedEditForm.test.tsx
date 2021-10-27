import { setupServer } from "msw/node"
import { rest } from "msw"
import { screen, waitForElementToBeRemoved, within } from "@testing-library/react"
import { renderWithQueryClient } from "../../../../test-utils"
import { setLogger } from "react-query"
import userEvent from "@testing-library/user-event"
import { ErrorType, ServerError } from "../../../../apiClient"
import { ApproveTajweedEditForm } from "./ApproveTajweedEditForm"
import { TajweedEnrolment } from "../TajweedEnrolment"
import { EnrolmentStatus } from "../../../model/EnrolmentStatus"

const ENROLMENT: TajweedEnrolment = {
  id: "1",
  name: "A",
  contactNumber: "0406000000",
  email: "a@test.com",
  occupation: "ABC",
  enrolmentReason: "Reason 1",
  applicantSignature: "A",
  address: {
    street: "1 Test Street",
    suburb: "NOBLE PARK",
    postcode: "3174",
    state: "Victoria"
  },
  submissionDate: "23/10/2021",
  marketingMethod: "Friends and Families",
  status: EnrolmentStatus.SUBMITTED
}

const server = setupServer()

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test("should display form", () => {
  renderWithQueryClient(<ApproveTajweedEditForm enrolment={ENROLMENT} />)

  const enrolmentReasonTextInput = screen.getByRole("textbox", { name: /reason for enrolling/i })
  expect(enrolmentReasonTextInput).toHaveValue(ENROLMENT.enrolmentReason)
  expect(enrolmentReasonTextInput).toHaveAttribute("readonly")

  const signatureTextInput = screen.getByRole("textbox", { name: /signature/i })
  expect(signatureTextInput).toHaveValue(ENROLMENT.applicantSignature)
  expect(signatureTextInput).toHaveAttribute("readonly")

  const submissionDateTextInput = screen.getByRole("textbox", { name: /submission date/i })
  expect(submissionDateTextInput).toHaveValue(ENROLMENT.submissionDate)
  expect(submissionDateTextInput).toHaveAttribute("readonly")

  const marketingMethodTextInput = screen.getByRole("textbox", { name: /method/i })
  expect(marketingMethodTextInput).toHaveValue(ENROLMENT.marketingMethod)
  expect(marketingMethodTextInput).toHaveAttribute("readonly")
})

test("should approve enrolment", async () => {
  giveSuccessfullServerResponse()

  renderWithQueryClient(<ApproveTajweedEditForm enrolment={ENROLMENT} />)

  userEvent.selectOptions(screen.getByRole("combobox", { name: /level/i }), "1")

  userEvent.click(screen.getByRole("button", { name: /approve/i }))

  await waitForElementToBeRemoved(await screen.findByText(/loading/i))

  expect(screen.getByText(/enrolment approved/i)).toBeInTheDocument()
})

test("should display error message when approve enrolment fails", async () => {
  givenErrorResponse(ErrorType.ERROR)

  renderWithQueryClient(<ApproveTajweedEditForm enrolment={ENROLMENT} />)

  userEvent.selectOptions(screen.getByRole("combobox", { name: /level/i }), "1")

  userEvent.click(screen.getByRole("button", { name: /approve/i }))

  await waitForElementToBeRemoved(await screen.findByText(/loading/i))

  expect(screen.getByText(/there was an error processing your request/i)).toBeInTheDocument()
})

test("should display server validation error message when approving enrolment", async () => {
  givenErrorResponse(ErrorType.VALIDATION_FAILED)

  renderWithQueryClient(<ApproveTajweedEditForm enrolment={ENROLMENT} />)

  userEvent.selectOptions(screen.getByRole("combobox", { name: /level/i }), "1")

  userEvent.click(screen.getByRole("button", { name: /approve/i }))

  await waitForElementToBeRemoved(await screen.findByText(/loading/i))

  expect(screen.getByText(/name validation error/i)).toBeInTheDocument()
  expect(screen.getByText(/validation error/i)).toBeInTheDocument()
})

test("displays validation error messages", async () => {
  const enrolment: TajweedEnrolment = {
    ...ENROLMENT,
    name: "",
    contactNumber: "",
    email: "",
    occupation: "",
    address: {
      street: "",
      suburb: "",
      postcode: "",
      state: ""
    }
  }

  renderWithQueryClient(<ApproveTajweedEditForm enrolment={enrolment} />)

  userEvent.click(screen.getByRole("button", { name: /approve/i }))

  expect(await screen.findAllByText(/required/i)).toHaveLength(9)
  expect(await screen.findByTestId(/name-error/i)).toHaveTextContent(/required/i)
  expect(await screen.findByTestId(/contactNumber-error/i)).toHaveTextContent(/required/i)
  expect(await screen.findByTestId(/email-error/i)).toHaveTextContent(/required/i)
  expect(await screen.findByTestId(/occupation-error/i)).toHaveTextContent(/required/i)
  expect(await screen.findByTestId(/address.street-error/i)).toHaveTextContent(/required/i)
  expect(await screen.findByTestId(/address.suburb-error/i)).toHaveTextContent(/required/i)
  expect(await screen.findByTestId(/address.postcode-error/i)).toHaveTextContent(/required/i)
  expect(await screen.findByTestId(/address.state-error/i)).toHaveTextContent(/required/i)
  expect(await screen.findByTestId(/level-error/i)).toHaveTextContent(/required/i)
})

const giveSuccessfullServerResponse = () => {
  server.use(
    rest.put<any, ServerError>("/api/enrolment/tajweed/:id", (req, res, ctx) => {
      return res(ctx.status(204), ctx.set("Content-Type", "application/json"))
    })
  )
}

const givenErrorResponse = (type: ErrorType) => {
  setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {}
  })

  server.use(
    rest.put<any, ServerError>("/api/enrolment/tajweed/:id", (req, res, ctx) => {
      const status: number = ErrorType.VALIDATION_FAILED === type ? 422 : 500
      const error: ServerError =
        ErrorType.VALIDATION_FAILED === type
          ? {
              type: ErrorType.VALIDATION_FAILED,
              message: "Validation error",
              violations: [
                {
                  field: "name",
                  messages: ["name validation error"]
                }
              ]
            }
          : {
              type: ErrorType.ERROR,
              message: "There was an error processing your request"
            }

      return res(ctx.status(status), ctx.json(error))
    })
  )
}
