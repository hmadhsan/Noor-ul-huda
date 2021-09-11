import { screen, within, RenderOptions } from "@testing-library/react"
import { render } from "../../test-utils"
import NavBar from "./NavBar"
import { BrowserRouter as Router } from "react-router-dom"

const renderOptions: RenderOptions = { wrapper: Router }

test("navigation should display logged in user's info", async () => {
  render(<NavBar />, renderOptions)

  expect(screen.getByText(/nha user/i)).toBeInTheDocument()
})

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
