import * as React from "react"
import { render, RenderOptions } from "@testing-library/react"
import { ChakraProvider, theme } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "react-query"

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

const renderWithClient = (client: QueryClient, ui: React.ReactElement, options?: RenderOptions) =>
  customRender(<QueryClientProvider client={client}>{ui}</QueryClientProvider>, options)

export { customRender as render, renderWithClient }
