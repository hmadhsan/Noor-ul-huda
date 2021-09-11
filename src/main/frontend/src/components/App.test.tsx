import { screen } from "@testing-library/react"
import { render } from "../test-utils"
import { App } from "./App"

test.skip("renders learn react link", () => {
  render(<App />)
  const linkElement = screen.getByText(/learn chakra/i)
  expect(linkElement).toBeInTheDocument()
})

describe("mobile navigation", () => {
  test.todo("should open when clicked")
  /**
   , async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 767
    })

    window.dispatchEvent(new Event("resize"))

    render(<App />, renderOptions)

    userEvent.click(screen.getByRole("button", { name: /open menu/i }))

    expect(screen.getByText(/close menu/i)).toBeInTheDocument()
  }
   */

  test.todo("should close when clicked")
  /**
   , async () => {
    window.resizeTo(767, 645)

    render(<App />)

    userEvent.click(screen.getByRole("button", { name: /open menu/i }))
    userEvent.click(screen.getByRole("button", { name: /close menu/i }))

    expect(screen.getByText(/open menu/i)).toBeInTheDocument()
  }
   */
})
