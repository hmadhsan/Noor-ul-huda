import React from "react"
import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  Heading,
  Center,
  Spinner,
  Tooltip,
  Alert,
  AlertIcon,
  Container
} from "@chakra-ui/react"
import { Column } from "react-table"
import { Table } from "../../table/Table"
import { EnrolmentStatus } from "../../model/EnrolmentStatus"
import { TajweedEnrolment } from "./TajweedEnrolment"
import { useFetchTajweedEnrolments } from "./useFetchTajweedEnrolments"

export const TajweedEnrolmentQueue = () => {
  return (
    <React.Fragment>
      <Heading size="md" fontWeight="extrabold" mb="6">
        Tajweed Wait List
      </Heading>
      <Box flex="1" borderWidth="3px" rounded="xl">
        <Tabs isFitted>
          <TabList>
            <Tooltip label="New placement requests">
              <Tab>New</Tab>
            </Tooltip>
            <Tooltip label="Enrolments waiting to be confirmed by the applicant">
              <Tab isDisabled>Pending</Tab>
            </Tooltip>
            <Tooltip label="Enrolments confirmed by the applicant">
              <Tab isDisabled>Confirmed</Tab>
            </Tooltip>
            <Tooltip label="Enrolments approved by admin">
              <Tab isDisabled>Finalized</Tab>
            </Tooltip>
          </TabList>
          <TabPanels>
            <TabPanel>
              <EnrolmentList status={EnrolmentStatus.SUBMITTED} />
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

interface EnrolmentListProps {
  status: EnrolmentStatus
}

const EnrolmentList = ({ status }: EnrolmentListProps) => {
  const [pageNumber, setPageNumber] = React.useState(0)
  const [showPerPage, setShowPerPage] = React.useState(5)

  const result = useFetchTajweedEnrolments(status, pageNumber, showPerPage)

  const columns: Column<TajweedEnrolment>[] = [
    { Header: "Name", accessor: "name" },
    { Header: "Contact No", accessor: "contactNumber" },
    { Header: "Suburb", accessor: (row) => row.address.suburb },
    { Header: "Submission Date", accessor: "submissionDate", disableSortBy: true }
  ]

  switch (result.status) {
    case "loading":
      return (
        <Center>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      )
    case "success": {
      const { items, totalPages } = result.data
      return (
        <Table
          tableColumns={columns}
          tableRows={items}
          totalPages={totalPages}
          pageNumber={pageNumber}
          showPerPage={showPerPage}
          setPageNumber={setPageNumber}
          setShowPerPage={setShowPerPage}
        />
      )
    }
    default:
      return (
        <Container centerContent>
          <Center>
            <Alert status="error" rounded="md">
              <AlertIcon />
              There was an error processing your request
            </Alert>
          </Center>
        </Container>
      )
  }
}
