import { Dispatch, SetStateAction, useEffect } from "react"
import {
  Button,
  ButtonGroup,
  HStack,
  Spacer,
  Text,
  Select,
  useColorModeValue as mode
} from "@chakra-ui/react"
import { UsePaginationInstanceProps, UseTableInstanceProps } from "react-table"

interface TablePaginationProps<T extends object>
  extends Pick<UseTableInstanceProps<T>, "state">,
    UsePaginationInstanceProps<T> {
  setPageNumber: Dispatch<SetStateAction<number>>
  setShowPerPage: Dispatch<SetStateAction<number>>
}

const ROWS_PER_PAGE = [5, 10, 15]

export const TablePagination = <T extends object>(props: TablePaginationProps<T>) => {
  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    setPageNumber,
    setShowPerPage
  } = props

  useEffect(() => {
    setPageNumber(pageIndex)
  }, [setPageNumber, pageIndex])

  useEffect(() => {
    setShowPerPage(pageSize)
  }, [setShowPerPage, pageSize])

  return (
    <HStack height="2.5rem">
      <Text color={mode("gray.600", "gray.400")} fontSize="md" fontWeight="semibold">
        Page {pageIndex + 1} of {pageOptions.length}
      </Text>
      <Spacer />
      <Text color={mode("gray.600", "gray.400")} fontSize="md">
        Rows per page
      </Text>
      <Select
        size="sm"
        width="4rem"
        rounded="base"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value))
        }}
      >
        {ROWS_PER_PAGE.map((rowsToDisplay) => (
          <option key={rowsToDisplay} value={rowsToDisplay}>
            {rowsToDisplay}
          </option>
        ))}
      </Select>
      <ButtonGroup variant="outline" size="sm">
        <Button rel="prev" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          First page
        </Button>
        <Button rel="prev" onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>
        <Button rel="next" onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
        <Button rel="next" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          Last page
        </Button>
      </ButtonGroup>
    </HStack>
  )
}
