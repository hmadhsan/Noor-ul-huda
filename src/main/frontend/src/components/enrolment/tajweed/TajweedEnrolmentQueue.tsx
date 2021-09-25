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
  Spinner
} from "@chakra-ui/react"
import { Column } from "react-table"
import { Table } from "../../table/Table"
import { EnrolmentStatus } from "../../model/EnrolmentStatus"
import { TajweedEnrolment } from "./TajweedEnrolment"
import { useFetchTajweedEnrolments } from "./useFetchTajweedEnrolments"

const TajweedEnrolmentQueue = () => {
  return (
    <React.Fragment>
      <Heading size="md" fontWeight="extrabold" mb="6">
        Tajweed Wait List
      </Heading>
      <Box flex="1" borderWidth="3px" rounded="xl">
        <Tabs isFitted>
          <TabList>
            <Tab>New Submissions</Tab>
            <Tab isDisabled>Pending Submissions</Tab>
            <Tab isDisabled>Confirmed Submissions</Tab>
            <Tab isDisabled>Finalized Submissions</Tab>
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
    { Header: "Contact No", accessor: "contactNo" },
    { Header: "Suburb", accessor: "suburb" },
    { Header: "Submission Date", accessor: "submissionDate" }
  ]

  switch (result.status) {
    case "loading":
      return (
        <Center height="60vh">
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
      return <div>Error</div>
  }
}

export default TajweedEnrolmentQueue
