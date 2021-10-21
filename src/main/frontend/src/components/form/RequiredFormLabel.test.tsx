import { screen } from "@testing-library/react"
import { render } from "../../test-utils"
import { RequiredFormLabel } from "./RequiredFormLabel"

test("should display label with requied symbol", () => {
  render(<RequiredFormLabel label={"Name"} />)

  const label = screen.getByText(/name */i)
  expect(label).toBeInTheDocument()
})
