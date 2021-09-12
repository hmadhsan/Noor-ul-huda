import React from "react"
import { useMemo } from "react"
import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  ButtonGroup,
  Text,
  Select,
  Spacer,
  HStack,
  useColorModeValue as mode
} from "@chakra-ui/react"
import { useTable, usePagination, Column } from "react-table"
import { format, add } from "date-fns"

interface TajweedEnrolment {
  name: string
  contactNo: string
  suburb: string
  submissionDate: string
}

const TajweedEnrolmentList = () => {
  return (
    <React.Fragment>
      <Heading size="md" fontWeight="extrabold" mb="6">
        Tajweed Enrolments
      </Heading>
      <Box flex="1" borderWidth="3px" rounded="xl">
        <Tabs isFitted>
          <TabList>
            <Tab>New</Tab>
            <Tab isDisabled>Pending</Tab>
            <Tab isDisabled>Confirmed</Tab>
            <Tab isDisabled>Finalized</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <EnrolmentList />
            </TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </React.Fragment>
  )
}

const EnrolmentList = () => {
  const data = useMemo<TajweedEnrolment[]>(
    () => [
      {
        name: "Mohammad Khan",
        contactNo: "0406000000",
        suburb: "NOBLE PARK",
        submissionDate: format(new Date(), "dd/MM/yyyy")
      },
      {
        name: "Hasnain Javed",
        contactNo: "0406111111",
        suburb: "NOBLE PARK",
        submissionDate: format(new Date(), "dd/MM/yyyy")
      },
      {
        name: "Rizwan Muzammil",
        contactNo: "0406222222",
        suburb: "DANDENONG",
        submissionDate: format(add(new Date(), { days: 1 }), "dd/MM/yyyy")
      },
      {
        name: "Muazzam Mushtaq",
        contactNo: "0406333333",
        suburb: "PAKENHAM",
        submissionDate: format(add(new Date(), { days: 3 }), "dd/MM/yyyy")
      },
      {
        name: "Mudaser Syed",
        contactNo: "0406444444",
        suburb: "KEYSBOROUGH",
        submissionDate: format(add(new Date(), { days: 4 }), "dd/MM/yyyy")
      }
    ],
    []
  )

  const columns = useMemo<Column<TajweedEnrolment>[]>(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Contact No", accessor: "contactNo" },
      { Header: "Suburb", accessor: "suburb" },
      { Header: "Submission Date", accessor: "submissionDate" }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable<TajweedEnrolment>(
    {
      columns,
      data,
      initialState: { pageSize: 2 }
    },
    usePagination
  )

  return (
    <Box as="section" py="12">
      <Box maxW={{ base: "xl", md: "7xl" }} mx="auto" px={{ base: "6", md: "8" }}>
        <Box overflowX="auto">
          <Table
            my="8"
            borderWidth="1px"
            fontSize="md"
            {...getTableProps()}
            size="lg"
            variant="striped"
          >
            <Thead bg={mode("gray.50", "gray.800")}>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th whiteSpace="nowrap" scope="col" {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row)
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Td whiteSpace="nowrap" {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </Td>
                      )
                    })}
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
          <HStack>
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
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[2, 4, 10].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </Select>
            <ButtonGroup variant="outline" size="sm">
              <Button as="a" rel="prev" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                First page
              </Button>
              <Button as="a" rel="prev" onClick={() => previousPage()} disabled={!canPreviousPage}>
                Previous
              </Button>
              <Button as="a" rel="next" onClick={() => nextPage()} disabled={!canNextPage}>
                Next
              </Button>
              <Button
                as="a"
                rel="prev"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                Last page
              </Button>
            </ButtonGroup>
          </HStack>
        </Box>
      </Box>
    </Box>
  )
}

export default TajweedEnrolmentList
