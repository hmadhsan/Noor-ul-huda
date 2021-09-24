import { Dispatch, SetStateAction } from "react"
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
import PaginatedList from "./PaginatedList"

interface TablePaginationProps<T extends object>
  extends Pick<UseTableInstanceProps<T>, "state">,
    UsePaginationInstanceProps<T> {
  setPageNumber: Dispatch<SetStateAction<number>>
  showPerPage: number
  setShowPerPage: (showPerPage: number) => void
  paged: PaginatedList<T>
}

const ROWS_PER_PAGE = [5, 10, 15]

export const TablePagination = <T extends object>(props: TablePaginationProps<T>) => {
  const {
    pageOptions,
    state: { pageIndex },
    setPageNumber,
    showPerPage,
    setShowPerPage,
    paged
  } = props

  const totalPages = paged.totalPages

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
        value={showPerPage}
        onChange={(e) => {
          setShowPerPage(Number(e.target.value))
        }}
      >
        {ROWS_PER_PAGE.map((rowsToDisplay) => (
          <option key={rowsToDisplay} value={rowsToDisplay}>
            {rowsToDisplay}
          </option>
        ))}
      </Select>
      <ButtonGroup variant="outline" size="sm">
        <Button rel="prev" onClick={() => setPageNumber(0)} disabled={paged.firstPage}>
          First page
        </Button>
        <Button
          rel="prev"
          onClick={() => setPageNumber((oldPageNumber) => Math.max(oldPageNumber - 1, 0))}
          disabled={paged.firstPage}
        >
          Previous
        </Button>
        <Button
          rel="next"
          onClick={() => setPageNumber((oldPageNumber) => oldPageNumber + 1)}
          disabled={paged.lastPage}
        >
          Next
        </Button>
        <Button
          rel="next"
          onClick={() => setPageNumber(Math.min(totalPages - 1, totalPages))}
          disabled={paged.lastPage}
        >
          Last page
        </Button>
      </ButtonGroup>
    </HStack>
  )
}
