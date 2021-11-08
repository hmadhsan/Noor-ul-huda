import NavBar from "./navigation/NavBar"
import Dashboard from "./dashboard/Dashboard"
import { useMobileMenuState } from "./navigation/mobile/useMobileMenuState"
import { MobileMenuButton } from "./navigation/mobile/MobileMenuButton"
import { Box, Flex, useColorModeValue as mode } from "@chakra-ui/react"
import { TajweedEnrolmentQueue } from "./enrolment/tajweed/TajweedEnrolmentQueue"
import { HifthEnrolmentQueue } from "./enrolment/hifth/HifthEnrolmentQueue"
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
              <Flex w="full" justify="space-between" align="center" minH="8">
                <MobileMenuButton onClick={toggle} isOpen={isOpen} />
              </Flex>
            </Flex>
            <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
              <Switch>
                <Route exact path="/">
                  <Dashboard />
                </Route>
                <Route exact path="/enrolments/tajweed">
                  <TajweedEnrolmentQueue />
                </Route>
                <Route exact path="/enrolments/hifth">
                  <HifthEnrolmentQueue />
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
