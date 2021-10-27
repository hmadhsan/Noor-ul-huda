import { setupServer } from "msw/node"
import { rest } from "msw"
import { screen, waitForElementToBeRemoved, within } from "@testing-library/react"
import { renderWithQueryClient } from "../../../../test-utils"
import { setLogger } from "react-query"
import userEvent from "@testing-library/user-event"
import { ErrorType, ServerError } from "../../../../apiClient"
import { ApproveTajweedFormModal } from "./ApproveTajweedFormModal"
import { TajweedEnrolment } from "../TajweedEnrolment"
import { EnrolmentStatus } from "../../../model/EnrolmentStatus"

const server = setupServer()

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

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

test.skip("should diplay view button", () => {
  renderWithQueryClient(<ApproveTajweedFormModal enrolment={ENROLMENT} />)

  expect(screen.getByRole("button", { name: /view/i })).toBeInTheDocument()
})

// test("should open modal", () => {
//   renderWithQueryClient(<ApproveTajweedFormModal enrolment={ENROLMENT} />)

//   userEvent.click(screen.getByRole("button", { name: /view/i }))

//   expect(screen.getByRole("heading", { name: /tajweed enrolment/i })).toBeInTheDocument()
//   expect(screen.getByRole("heading", { name: /personal info/i })).toBeInTheDocument()

//   const dialog = screen.getByRole("dialog")

//   expect(within(dialog).getByText(/name/i)).toBeInTheDocument()
//   expect(screen.getByRole("textbox", { name: /name/i })).toHaveValue(ENROLMENT.name)

//   expect(within(dialog).getByText(/contact number/i)).toBeInTheDocument()
//   expect(screen.getByRole("textbox", { name: /contact number/i })).toHaveValue(
//     ENROLMENT.contactNumber
//   )

//   expect(within(dialog).getByText(/email/i)).toBeInTheDocument()
//   expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue(ENROLMENT.email)

//   expect(within(dialog).getByText(/occupation/i)).toBeInTheDocument()
//   expect(screen.getByRole("textbox", { name: /occupation/i })).toHaveValue(ENROLMENT.occupation)

//   expect(within(dialog).getByText(/reason for enrolling/i)).toBeInTheDocument()
//   const enrolmentReasonTextInput = screen.getByRole("textbox", { name: /reason for enrolling/i })
//   expect(enrolmentReasonTextInput).toHaveValue(ENROLMENT.enrolmentReason)
//   expect(enrolmentReasonTextInput).toHaveAttribute("readonly")

//   expect(within(dialog).getByText(/signature/i)).toBeInTheDocument()
//   const signatureTextInput = screen.getByRole("textbox", { name: /signature/i })
//   expect(signatureTextInput).toHaveValue(ENROLMENT.applicantSignature)
//   expect(signatureTextInput).toHaveAttribute("readonly")

//   expect(within(dialog).getByText(/submission date/i)).toBeInTheDocument()
//   const submissionDateTextInput = screen.getByRole("textbox", { name: /submission date/i })
//   expect(submissionDateTextInput).toHaveValue(ENROLMENT.submissionDate)
//   expect(submissionDateTextInput).toHaveAttribute("readonly")

//   expect(screen.getByRole("heading", { name: /address/i })).toBeInTheDocument()
//   expect(within(dialog).getByText(/street/i)).toBeInTheDocument()
//   const streetTextInput = screen.getByRole("textbox", { name: /street/i })
//   expect(streetTextInput).toHaveValue(ENROLMENT.address.street)

//   expect(within(dialog).getByText(/suburb/i)).toBeInTheDocument()
//   const suburbTextInput = screen.getByRole("textbox", { name: /suburb/i })
//   expect(suburbTextInput).toHaveValue(ENROLMENT.address.suburb)

//   expect(within(dialog).getByText(/postcode/i)).toBeInTheDocument()
//   const postcodeTextInput = screen.getByRole("textbox", { name: /postcode/i })
//   expect(postcodeTextInput).toHaveValue(ENROLMENT.address.postcode)

//   expect(within(dialog).getByText(/state/i)).toBeInTheDocument()
//   expect(screen.getByRole("combobox", { name: /state/i })).toHaveValue(ENROLMENT.address.state)

//   expect(screen.getByRole("heading", { name: /marketing/i })).toBeInTheDocument()
//   const marketingMethodTextInput = screen.getByRole("textbox", { name: /method/i })
//   expect(marketingMethodTextInput).toHaveValue(ENROLMENT.marketingMethod)
//   expect(marketingMethodTextInput).toHaveAttribute("readonly")

//   expect(screen.getByRole("heading", { name: /tajweed assessment/i })).toBeInTheDocument()
//   expect(screen.getByRole("combobox", { name: /level/i })).toHaveValue("")
//   expect(screen.getByRole("textbox", { name: /notes/i })).toBeInTheDocument()
// })

// test("should close modal", async () => {
//   renderWithQueryClient(<ApproveTajweedFormModal enrolment={ENROLMENT} />)

//   userEvent.click(screen.getByRole("button", { name: /view/i }))

//   const dialog = screen.getByRole("dialog")

//   userEvent.click(within(dialog).getByLabelText(/close/i))

//   await waitForElementToBeRemoved(dialog, {
//     timeout: 10000
//   })

//   expect(dialog).not.toBeInTheDocument()
// })

// test("should approve enrolment", async () => {
//   giveSuccessfullServerResponse()

//   renderWithQueryClient(<ApproveTajweedFormModal enrolment={ENROLMENT} />)

//   userEvent.click(screen.getByRole("button", { name: /view/i }))

//   const dialog = screen.getByRole("dialog")

//   userEvent.selectOptions(within(dialog).getByRole("combobox", { name: /level/i }), "1")

//   userEvent.click(within(dialog).getByRole("button", { name: /approve/i }))

//   await waitForElementToBeRemoved(await screen.findByText(/loading/i))

//   expect(screen.getByText(/enrolment approved/i)).toBeInTheDocument()
// })

// test("should display error message when approve enrolment fails", async () => {
//   givenErrorResponse(ErrorType.ERROR)

//   renderWithQueryClient(<ApproveTajweedFormModal enrolment={ENROLMENT} />)

//   userEvent.click(screen.getByRole("button", { name: /view/i }))

//   const dialog = screen.getByRole("dialog")

//   userEvent.selectOptions(within(dialog).getByRole("combobox", { name: /level/i }), "1")

//   userEvent.click(within(dialog).getByRole("button", { name: /approve/i }))

//   await waitForElementToBeRemoved(await screen.findByText(/loading/i))

//   expect(screen.getByText(/there was an error processing your request/i)).toBeInTheDocument()
// })

// test("should display server validation error message when approving enrolment", async () => {
//   givenErrorResponse(ErrorType.VALIDATION_FAILED)

//   renderWithQueryClient(<ApproveTajweedFormModal enrolment={ENROLMENT} />)

//   userEvent.click(screen.getByRole("button", { name: /view/i }))

//   const dialog = screen.getByRole("dialog")

//   userEvent.selectOptions(within(dialog).getByRole("combobox", { name: /level/i }), "1")

//   userEvent.click(within(dialog).getByRole("button", { name: /approve/i }))

//   await waitForElementToBeRemoved(await screen.findByText(/loading/i))

//   expect(screen.getByText(/name validation error/i)).toBeInTheDocument()
//   expect(screen.getByText(/validation error/i)).toBeInTheDocument()
// })

// const giveSuccessfullServerResponse = () => {
//   server.use(
//     rest.put<any, ServerError>("/api/enrolment/tajweed/:id", (req, res, ctx) => {
//       return res(ctx.status(204), ctx.set("Content-Type", "application/json"))
//     })
//   )
// }

// const givenErrorResponse = (type: ErrorType) => {
//   setLogger({
//     log: console.log,
//     warn: console.warn,
//     error: () => {}
//   })

//   server.use(
//     rest.put<any, ServerError>("/api/enrolment/tajweed/:id", (req, res, ctx) => {
//       const status: number = ErrorType.VALIDATION_FAILED === type ? 422 : 500
//       const error: ServerError =
//         ErrorType.VALIDATION_FAILED === type
//           ? {
//               type: ErrorType.VALIDATION_FAILED,
//               message: "Validation error",
//               violations: [
//                 {
//                   field: "name",
//                   messages: ["name validation error"]
//                 }
//               ]
//             }
//           : {
//               type: ErrorType.ERROR,
//               message: "There was an error processing your request"
//             }

//       return res(ctx.status(status), ctx.json(error))
//     })
//   )
// }

/*
describe.skip("form validation", () => {
  test("displays validation messages for required fields", async () => {
    const enrolment: TajweedEnrolment = {
      id: ENROLMENT_ID,
      name: "",
      contactNumber: "",
      email: "",
      occupation: "",
      enrolmentReason: "Reason 1",
      applicantSignature: "A",
      address: {
        street: "",
        suburb: "",
        postcode: "",
        state: ""
      },
      submissionDate: "23/10/2021",
      marketingMethod: "Friends and Families",
      status: EnrolmentStatus.SUBMITTED
    }

    renderWithQueryClient(<ApproveTajweedFormModal enrolment={enrolment} />)

    userEvent.click(screen.getByRole("button", { name: /view/i }))
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

  test("displays validation messages when notes exceeds maximum character limit", async () => {
    renderWithQueryClient(<ApproveTajweedFormModal enrolment={ENROLMENT} />)

    userEvent.click(screen.getByRole("button", { name: /view/i }))

    userEvent.type(screen.getByRole("textbox", { name: /notes/i }), "a".repeat(301))

    userEvent.click(screen.getByRole("button", { name: /approve/i }))

    expect(await screen.findByTestId(/notes-error/i)).toHaveTextContent(
      /notes can not exceed 300 characters/i
    )
  })
})
*/
