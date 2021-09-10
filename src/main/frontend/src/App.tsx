import NavBar from "./components/navbar/NavBar"
import { NavBreadcrumb } from "./components/navbar/NavBreadcrumb"
import Dashboard from "./components/dashboard/Dashboard"
import { Table } from "./components/table/Table"
import { useMobileMenuState } from "./components/navbar/mobile/useMobileMenuState"
import { MobileMenuButton } from "./components/navbar/mobile/MobileMenuButton"
import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  Flex,
  Heading,
  useColorModeValue as mode
} from "@chakra-ui/react"
import { Route, Switch } from "react-router-dom"

export const App = () => {
  const { isOpen, toggle } = useMobileMenuState()

  return (
    <Flex
      height="100vh"
      bg={mode("blue.800", "gray.800")}
      overflow="hidden"
      sx={{ "--sidebar-width": "16rem" }}
    >
      <NavBar />
      <Box
        flex="1"
        p={{ base: "0", md: "6" }}
        marginStart={{ md: "var(--sidebar-width)" }}
        position="relative"
        left={isOpen ? "var(--sidebar-width)" : "0"}
        transition="left 0.2s"
      >
        <Box
          maxW="2560px"
          bg={mode("white", "gray.700")}
          height="100%"
          pb="6"
          rounded={{ md: "lg" }}
        >
          <Flex direction="column" height="full">
            <Flex w="full" py="4" justify="space-between" align="center" px="10">
              <Flex align="center" minH="8">
                <MobileMenuButton onClick={toggle} isOpen={isOpen} />
                <NavBreadcrumb />
              </Flex>
            </Flex>
            <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
              <Switch>
                <Route exact path="/">
                  <Heading size="md" fontWeight="extrabold" mb="6">
                    Dashboard
                  </Heading>
                  <Dashboard />
                </Route>
                <Route exact path="/enrolments/tajweed">
                  <Heading size="md" fontWeight="extrabold" mb="6">
                    Tajweed Enrolments
                  </Heading>
                  <Box flex="1" borderWidth="3px" rounded="xl">
                    <Tabs isFitted>
                      <TabList>
                        <Tab>New</Tab>
                        <Tab>Pending</Tab>
                        <Tab>Confirmed</Tab>
                        <Tab>Finalized</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <Table />
                        </TabPanel>
                        <TabPanel>
                          <Table />
                        </TabPanel>
                        <TabPanel>
                          <Table />
                        </TabPanel>
                        <TabPanel>
                          <Table />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>
                </Route>
                <Route path="*">
                  <h1 className="text-center">Four oh Four</h1>
                </Route>
              </Switch>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}
