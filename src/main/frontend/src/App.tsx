import * as React from "react"
import VDashboardApp from "./components/dashboard/verticle/VDashboardApp"
import HDashboardApp from "./components/dashboard/horizontal/HDashboard"
import {
  ChakraProvider,
  theme,
  VStack,
  Box
} from "@chakra-ui/react"

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

const DashboardMenu = () => {
  return (
    <VStack align="left">
      <Box >
        <Link to="/dashboard/v" >Vertical Nav Dashboard</Link>
      </Box>
      <Box >
        <Link to="/dashboard/h" >Horizontal Nav Dashboard</Link>
      </Box>
    </VStack>
  )
}

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path='/'>
          <DashboardMenu />
        </Route>
        <Route path='/dashboard/v'>
          <VDashboardApp />
        </Route>
        <Route path='/dashboard/h'>
          <HDashboardApp />
        </Route>
        <Route path='*'>
          <h1 className='text-center'>Four oh Four</h1>
        </Route>
      </Switch>
    </Router>
  </ChakraProvider>
)
