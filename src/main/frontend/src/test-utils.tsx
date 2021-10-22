import * as React from "react"
import { render, RenderOptions } from "@testing-library/react"
import { ChakraProvider, theme } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider, DefaultOptions } from "react-query"

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

const renderWithQueryClient = (
  ui: React.ReactElement,
  config?: DefaultOptions,
  options?: RenderOptions
) =>
  customRender(
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: config
        })
      }
    >
      {ui}
    </QueryClientProvider>,
    options
  )

export { customRender as render, renderWithQueryClient }
