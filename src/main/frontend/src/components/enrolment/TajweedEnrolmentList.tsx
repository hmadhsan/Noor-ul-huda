import React from "react"
import { Tabs, Tab, TabList, TabPanels, TabPanel, Box, Heading } from "@chakra-ui/react"
import { Table } from "../table/Table"

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
              <Table />
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

export default TajweedEnrolmentList
