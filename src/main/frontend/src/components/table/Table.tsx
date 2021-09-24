import { Box } from "@chakra-ui/react"
import { useMemo, Dispatch, SetStateAction } from "react"
import { TableActions } from "./TableActions"
import { TableContent } from "./TableContent"
import { TablePagination } from "./TablePagination"
import { useTable, usePagination, useSortBy, useGlobalFilter, Column } from "react-table"
import PaginatedList from "./PaginatedList"

interface TableProps<T extends object> {
  tableColumns: Column<T>[]
  pageNumber: number
  setPageNumber: Dispatch<SetStateAction<number>>
  showPerPage?: number
  setShowPerPage: Dispatch<SetStateAction<number>>
  paged: PaginatedList<T>
}

export const Table = <T extends object>({
  tableColumns,
  setPageNumber,
  showPerPage = 10,
  setShowPerPage,
  pageNumber,
  paged
}: TableProps<T>) => {
  const columns = useMemo<Column<T>[]>(() => tableColumns, [tableColumns])
  const data = useMemo<T[]>(() => paged.items, [paged.items])

  const tableInstance = useTable<T>(
    {
      columns,
      data,
      initialState: { pageIndex: pageNumber, pageSize: showPerPage },
      manualPagination: true,
      pageCount: paged.totalPages
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
            showPerPage={showPerPage}
            setShowPerPage={setShowPerPage}
            paged={paged}
          />
        </Box>
      </Box>
    </Box>
  )
}
