import { screen } from "@testing-library/react"
import { render } from "../../test-utils"
import Dashboard from "./Dashboard"

test("should have page title", async () => {
  render(<Dashboard />)

  expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument()
})
