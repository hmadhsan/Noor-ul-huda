import React from "react"
import { Tabs, Tab, TabList, TabPanels, TabPanel, Box, Heading } from "@chakra-ui/react"
import { Column } from "react-table"
import { format, add } from "date-fns"
import { Table } from "../../table/Table"

interface TajweedEnrolment {
  name: string
  contactNo: string
  suburb: string
  submissionDate: string
}

const TajweedEnrolmentQueue = () => {
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
  const data: TajweedEnrolment[] = [
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
    },
    {
      name: "Ali Aziz",
      contactNo: "0406555555",
      suburb: "CLYDE",
      submissionDate: format(add(new Date(), { days: 5 }), "dd/MM/yyyy")
    }
  ]

  const columns: Column<TajweedEnrolment>[] = [
    { Header: "Name", accessor: "name" },
    { Header: "Contact No", accessor: "contactNo" },
    { Header: "Suburb", accessor: "suburb" },
    { Header: "Submission Date", accessor: "submissionDate" }
  ]

  return <Table tableColumns={columns} tableRows={data} />
}

export default TajweedEnrolmentQueue
