import { screen, within, RenderOptions } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { render } from "../../test-utils"
import NavBar from "./NavBar"
import { BrowserRouter as Router } from "react-router-dom"

const renderOptions: RenderOptions = { wrapper: Router }

it.each`
  section
  ${"enrolments"}
  ${"admin"}
`("navigation should have sections for '$section'", async ({ section }) => {
  render(<NavBar />, renderOptions)

  expect(
    within(screen.getByRole("navigation")).getByText(new RegExp(section, "i"))
  ).toBeInTheDocument()
})

it.each`
  navLink
  ${"dashboard"}
  ${"maktab"}
  ${"hifth"}
  ${"tajweed"}
  ${"campuses"}
`("navigation should have link for '$navLink'", async ({ navLink }) => {
  render(<NavBar />, renderOptions)

  const regex = new RegExp(navLink, "i")

  expect(within(screen.getByRole("link", { name: regex })).getByText(regex)).toBeInTheDocument()
})

describe("user account menu", () => {
  test("should display logged in user's name", async () => {
    render(<NavBar />, renderOptions)

    expect(screen.getByText(/nha user/i)).toBeInTheDocument()
  })

  test("should open when clicked", async () => {
    render(<NavBar />, renderOptions)

    userEvent.click(screen.getByRole("button", { expanded: false }))

    expect(screen.getByRole("button", { expanded: true })).toBeInTheDocument()
  })

  test("should close when clicked", async () => {
    render(<NavBar />, renderOptions)

    userEvent.click(screen.getByRole("button", { expanded: false }))
    userEvent.click(screen.getByRole("button", { expanded: true }))

    expect(screen.getByRole("button", { expanded: false })).toBeInTheDocument()
  })

  test("should display logged in user's email", async () => {
    render(<NavBar />, renderOptions)

    userEvent.click(screen.getByRole("button", { expanded: false }))

    expect(screen.getByText(/user@nha\.org\.au/i)).toBeInTheDocument()
  })

  test("should have logout link", async () => {
    render(<NavBar />, renderOptions)

    userEvent.click(screen.getByRole("button", { expanded: false }))

    expect(await screen.findByRole("menuitem", { name: /logout/i })).toBeInTheDocument()
  })
})
