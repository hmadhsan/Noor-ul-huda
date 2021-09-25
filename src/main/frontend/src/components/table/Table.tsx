import { Box } from "@chakra-ui/react"
import { useMemo, Dispatch, SetStateAction } from "react"
import { TableActions } from "./TableActions"
import { TableContent } from "./TableContent"
import { TablePagination } from "./TablePagination"
import { useTable, usePagination, useSortBy, useGlobalFilter, Column } from "react-table"

interface TableProps<T extends object> {
  tableColumns: Column<T>[]
  tableRows: T[]
  totalPages?: number
  pageNumber?: number
  showPerPage?: number
  setPageNumber: Dispatch<SetStateAction<number>>
  setShowPerPage: Dispatch<SetStateAction<number>>
}

export const Table = <T extends object>({
  tableColumns,
  tableRows,
  totalPages = 0,
  pageNumber = 0,
  showPerPage = 10,
  setPageNumber,
  setShowPerPage
}: TableProps<T>) => {
  const columns = useMemo<Column<T>[]>(() => tableColumns, [tableColumns])
  const data = useMemo<T[]>(() => tableRows, [tableRows])

  const tableInstance = useTable<T>(
    {
      columns,
      data,
      initialState: { pageIndex: pageNumber, pageSize: showPerPage },
      manualPagination: true,
      pageCount: totalPages
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  return (
    <Box as="section" py="12">
      <Box maxW={{ base: "xl", md: "7xl" }} mx="auto" px={{ base: "6", md: "8" }}>
        <Box overflowX="auto">
          <TableActions {...tableInstance} />
          <TableContent {...tableInstance} />
          <TablePagination
            {...tableInstance}
            setPageNumber={setPageNumber}
            setShowPerPage={setShowPerPage}
          />
        </Box>
      </Box>
    </Box>
  )
}
