import { screen } from "@testing-library/react"
import { render } from "../../test-utils"
import { Column } from "react-table"
import { Table } from "./Table"
import userEvent from "@testing-library/user-event"

interface TestData {
  name: string
  version: string
}

const TEST_COLUMNS: Column<TestData>[] = [
  { Header: "Name", accessor: "name" },
  { Header: "Version", accessor: "version" }
]

const TEST_ROWS: TestData[] = [
  { name: "Java", version: "11" },
  { name: "Typescript", version: "4.x" }
]

test("table should display search bar", () => {
  render(
    <Table tableColumns={[]} tableRows={[]} setPageNumber={jest.fn()} setShowPerPage={jest.fn()} />
  )

  expect(screen.getByRole("searchbox")).toBeInTheDocument()
})

test("table should display columns", () => {
  render(
    <Table
      tableColumns={TEST_COLUMNS}
      tableRows={[]}
      setPageNumber={jest.fn()}
      setShowPerPage={jest.fn()}
    />
  )
  expect(screen.getAllByRole("columnheader")).toHaveLength(2)
  expect(screen.getByText(/name/i)).toBeInTheDocument()
  expect(screen.getByText(/version/i)).toBeInTheDocument()
})

test("table should display rows", () => {
  render(
    <Table
      tableColumns={TEST_COLUMNS}
      tableRows={TEST_ROWS}
      setPageNumber={jest.fn()}
      setShowPerPage={jest.fn()}
    />
  )
  expect(screen.getByRole("row", { name: /java 11/i })).toBeInTheDocument()
  expect(screen.getByRole("row", { name: /typescript 4.x/i })).toBeInTheDocument()
})

describe("pagination controls", () => {
  test("should display page information", () => {
    render(
      <Table
        tableColumns={[]}
        tableRows={[]}
        totalPages={1}
        setPageNumber={jest.fn()}
        setShowPerPage={jest.fn()}
      />
    )
    expect(screen.getByText(/page 1 of 1/i)).toBeInTheDocument()
  })

  test("should display page size dropdown", () => {
    render(
      <Table
        tableColumns={[]}
        tableRows={[]}
        setPageNumber={jest.fn()}
        setShowPerPage={jest.fn()}
      />
    )
    expect(screen.getByRole("combobox")).toHaveValue("10")
  })

  test("should have all pagination buttons disabled", () => {
    render(
      <Table
        tableColumns={[]}
        tableRows={[]}
        setPageNumber={jest.fn()}
        setShowPerPage={jest.fn()}
      />
    )
    expect(screen.getByText(/first page/i)).toBeDisabled()
    expect(screen.getByText(/previous/i)).toBeDisabled()
    expect(screen.getByText(/next/i)).toBeDisabled()
    expect(screen.getByText(/last page/i)).toBeDisabled()
  })

  test("should have forward pagination buttons enabled", () => {
    render(
      <Table
        tableColumns={TEST_COLUMNS}
        tableRows={TEST_ROWS}
        showPerPage={1}
        totalPages={2}
        setPageNumber={jest.fn()}
        setShowPerPage={jest.fn()}
      />
    )

    expect(screen.getByText(/first page/i)).toBeDisabled()
    expect(screen.getByText(/previous/i)).toBeDisabled()
    expect(screen.getByText(/next/i)).toBeEnabled()
    expect(screen.getByText(/last page/i)).toBeEnabled()
  })

  test("should go to next page", () => {
    const setPageNumber = jest.fn()
    render(
      <Table
        tableColumns={TEST_COLUMNS}
        tableRows={TEST_ROWS}
        showPerPage={1}
        totalPages={2}
        setPageNumber={setPageNumber}
        setShowPerPage={jest.fn()}
      />
    )

    expect(screen.getByText(/first page/i)).toBeDisabled()
    expect(screen.getByText(/previous/i)).toBeDisabled()

    userEvent.click(screen.getByText(/next/i))

    expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument()
    expect(screen.getByText(/first page/i)).toBeEnabled()
    expect(screen.getByText(/previous/i)).toBeEnabled()
    expect(screen.getByText(/next/i)).toBeDisabled()
    expect(screen.getByText(/last page/i)).toBeDisabled()

    expect(setPageNumber.mock.calls.length).toBe(2)
    expect(setPageNumber.mock.calls[0][0]).toBe(0)
    expect(setPageNumber.mock.calls[1][0]).toBe(1)
  })

  test("should go to last page", () => {
    const setPageNumber = jest.fn()
    render(
      <Table
        tableColumns={TEST_COLUMNS}
        tableRows={TEST_ROWS}
        showPerPage={1}
        totalPages={2}
        setPageNumber={setPageNumber}
        setShowPerPage={jest.fn}
      />
    )

    expect(screen.getByText(/first page/i)).toBeDisabled()
    expect(screen.getByText(/previous/i)).toBeDisabled()

    userEvent.click(screen.getByText(/last page/i))

    expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument()
    expect(screen.getByText(/first page/i)).toBeEnabled()
    expect(screen.getByText(/previous/i)).toBeEnabled()
    expect(screen.getByText(/next/i)).toBeDisabled()
    expect(screen.getByText(/last page/i)).toBeDisabled()

    expect(setPageNumber.mock.calls.length).toBe(2)
    expect(setPageNumber.mock.calls[0][0]).toBe(0)
    expect(setPageNumber.mock.calls[1][0]).toBe(1)
  })

  test("should go to previous page", () => {
    const setPageNumber = jest.fn()
    render(
      <Table
        tableColumns={TEST_COLUMNS}
        tableRows={TEST_ROWS}
        showPerPage={1}
        pageNumber={1}
        totalPages={2}
        setPageNumber={setPageNumber}
        setShowPerPage={jest.fn()}
      />
    )

    expect(screen.getByText(/next/i)).toBeDisabled()
    expect(screen.getByText(/last page/i)).toBeDisabled()
    expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument()

    userEvent.click(screen.getByText(/previous/i))

    expect(screen.getByText(/page 1 of 2/i)).toBeInTheDocument()
    expect(screen.getByText(/first page/i)).toBeDisabled()
    expect(screen.getByText(/previous/i)).toBeDisabled()
    expect(screen.getByText(/next/i)).toBeEnabled()
    expect(screen.getByText(/last page/i)).toBeEnabled()

    expect(setPageNumber.mock.calls.length).toBe(2)
    expect(setPageNumber.mock.calls[0][0]).toBe(1)
    expect(setPageNumber.mock.calls[1][0]).toBe(0)
  })

  test("should go to first page", () => {
    const setPageNumber = jest.fn()
    render(
      <Table
        tableColumns={TEST_COLUMNS}
        tableRows={TEST_ROWS}
        showPerPage={1}
        pageNumber={1}
        totalPages={2}
        setPageNumber={setPageNumber}
        setShowPerPage={jest.fn()}
      />
    )

    expect(screen.getByText(/next/i)).toBeDisabled()
    expect(screen.getByText(/last page/i)).toBeDisabled()
    expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument()

    userEvent.click(screen.getByText(/first page/i))

    expect(screen.getByText(/page 1 of 2/i)).toBeInTheDocument()
    expect(screen.getByText(/first page/i)).toBeDisabled()
    expect(screen.getByText(/previous/i)).toBeDisabled()
    expect(screen.getByText(/next/i)).toBeEnabled()
    expect(screen.getByText(/last page/i)).toBeEnabled()

    expect(setPageNumber.mock.calls.length).toBe(2)
    expect(setPageNumber.mock.calls[0][0]).toBe(1)
    expect(setPageNumber.mock.calls[1][0]).toBe(0)
  })

  test("should update rows per page", () => {
    const setShowPerPage = jest.fn()
    render(
      <Table
        tableColumns={TEST_COLUMNS}
        tableRows={[]}
        setPageNumber={jest.fn()}
        setShowPerPage={setShowPerPage}
      />
    )

    const dropdown = screen.getByRole("combobox")

    expect(dropdown).toHaveValue("10")

    userEvent.selectOptions(dropdown, ["5"])

    expect(setShowPerPage.mock.calls.length).toBe(2)
    expect(setShowPerPage.mock.calls[0][0]).toBe(10)
    expect(setShowPerPage.mock.calls[1][0]).toBe(5)
  })
})
