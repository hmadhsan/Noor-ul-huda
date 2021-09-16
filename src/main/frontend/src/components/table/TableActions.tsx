import { HStack, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa"

import {
  UseTableInstanceProps,
  UseGlobalFiltersState,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions
} from "react-table"

type TableActionsProps<T extends object> = UseTableInstanceProps<T> &
  Partial<UseGlobalFiltersState<T>> &
  UseGlobalFiltersInstanceProps<T> &
  UseGlobalFiltersOptions<T>

export const TableActions = <T extends object>({
  state,
  setGlobalFilter
}: TableActionsProps<T>) => {
  return (
    <Stack
      spacing="4"
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      mt="1px"
      ml="1px"
    >
      <HStack>
        <InputGroup size="sm" minW={{ md: "20rem" }}>
          <InputLeftElement pointerEvents="none" color="gray.400">
            <FaSearch />
          </InputLeftElement>
          <Input
            rounded="base"
            type="search"
            value={state.globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </InputGroup>
      </HStack>
    </Stack>
  )
}
