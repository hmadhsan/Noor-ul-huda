import { screen } from "@testing-library/react"
import { render } from "../../test-utils"
import { Column } from "react-table"
import { Table } from "./Table"

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

describe("rendering table", () => {
  test("should have a search bar", () => {
    render(<Table tableColumns={TEST_COLUMNS} tableRows={TEST_ROWS} />)

    expect(screen.getByRole("searchbox")).toBeInTheDocument()
  })

  test("should display columns", () => {
    render(<Table tableColumns={TEST_COLUMNS} tableRows={TEST_ROWS} />)
    expect(screen.getAllByRole("columnheader")).toHaveLength(2)
    expect(screen.getByText(/name/i)).toBeInTheDocument()
    expect(screen.getByText(/version/i)).toBeInTheDocument()
  })

  test("should display rows", () => {
    render(<Table tableColumns={TEST_COLUMNS} tableRows={TEST_ROWS} />)
    expect(screen.getByRole("row", { name: /java 11/i })).toBeInTheDocument()
    expect(screen.getByRole("row", { name: /typescript 4.x/i })).toBeInTheDocument()
  })

  test("should display pagination controls", () => {
    render(<Table tableColumns={TEST_COLUMNS} tableRows={TEST_ROWS} />)
    expect(screen.getByText(/page 1 of 1/i)).toBeInTheDocument()
    expect(screen.getByText(/rows per page/i)).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveValue("10")
    expect(screen.getByText(/first page/i)).toBeInTheDocument()
    expect(screen.getByText(/previous/i)).toBeInTheDocument()
    expect(screen.getByText(/next/i)).toBeInTheDocument()
    expect(screen.getByText(/last page/i)).toBeInTheDocument()
  })
})
