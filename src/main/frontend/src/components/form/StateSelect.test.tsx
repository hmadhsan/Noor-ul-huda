import { screen } from "@testing-library/react"
import { render } from "../../test-utils"
import { StateSelect } from "./StateSelect"
import { STATES } from "../ui-utils"

test("should have all state values", () => {
  render(<StateSelect />)

  Array.from(STATES.values()).forEach((state: string) => {
    expect(screen.getByRole("option", { name: new RegExp(state, "i") })).toBeInTheDocument()
  })
})

test("should have no state selected", () => {
  render(<StateSelect />)

  expect(screen.getByRole("combobox")).toHaveDisplayValue("")
})

test("should have state selected", () => {
  render(<StateSelect selectedState="Victoria" />)

  expect(screen.getByRole("combobox")).toHaveDisplayValue("Victoria")
})
