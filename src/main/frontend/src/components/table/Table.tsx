import { Box } from "@chakra-ui/react"
import { useMemo } from "react"
import { TableActions } from "./TableActions"
import { TableContent } from "./TableContent"
import { TablePagination } from "./TablePagination"
import { useTable, usePagination, useSortBy, useGlobalFilter, Column } from "react-table"

interface TableProps<T extends object> {
  tableColumns: Column<T>[]
  tableRows: T[]
  pageSize?: number
}

export const Table = <T extends object>({
  tableColumns,
  tableRows,
  pageSize = 10
}: TableProps<T>) => {
  const columns = useMemo<Column<T>[]>(() => tableColumns, [tableColumns])
  const data = useMemo<T[]>(() => tableRows, [tableRows])

  const tableInstance = useTable<T>(
    { columns, data, initialState: { pageSize } },
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
          <TablePagination {...tableInstance} />
        </Box>
      </Box>
    </Box>
  )
}
