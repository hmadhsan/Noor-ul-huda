import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { render } from "../../test-utils"
import { UserAccount } from "./UserAccount"

test("should display logged in user's name", async () => {
  render(<UserAccount />)

  expect(screen.getByText(/nha user/i)).toBeInTheDocument()
})

test("should open when clicked", async () => {
  render(<UserAccount />)

  userEvent.click(screen.getByRole("button", { expanded: false }))

  expect(screen.getByRole("button", { expanded: true })).toBeInTheDocument()
})

test("should close when clicked", async () => {
  render(<UserAccount />)

  userEvent.click(screen.getByRole("button", { expanded: false }))
  userEvent.click(screen.getByRole("button", { expanded: true }))

  expect(screen.getByRole("button", { expanded: false })).toBeInTheDocument()
})

test("should display logged in user's email", async () => {
  render(<UserAccount />)

  userEvent.click(screen.getByRole("button", { expanded: false }))

  expect(screen.getByText(/user@nha\.org\.au/i)).toBeInTheDocument()
})

test("should have logout link", async () => {
  render(<UserAccount />)

  userEvent.click(screen.getByRole("button", { expanded: false }))

  expect(await screen.findByRole("menuitem", { name: /logout/i })).toBeInTheDocument()
})
