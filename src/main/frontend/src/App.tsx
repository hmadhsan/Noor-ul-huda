import * as React from "react"
import VDashboardApp from "./components/dashboard/verticle/VDashboardApp"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Switch>
        <Route path='/dashboard/v'>
          <VDashboardApp />
        </Route>
        <Route path='*'>
          <h1 className='text-center'>Four oh Four</h1>
        </Route>
      </Switch>
    </Router>
  </ChakraProvider>
)
