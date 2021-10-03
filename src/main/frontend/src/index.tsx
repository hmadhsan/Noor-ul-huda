import * as React from "react"
import ReactDOM from "react-dom"
import { App } from "./components/App"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import "./mocks/browser"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 2000
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
