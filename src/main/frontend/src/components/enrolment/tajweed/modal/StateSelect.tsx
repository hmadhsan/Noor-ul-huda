import { FormControl, FormLabel, Select, SelectProps } from "@chakra-ui/react"
import * as React from "react"

export const StateSelect = (props: SelectProps) => (
  <FormControl id="state">
    <FormLabel>State</FormLabel>
    <Select maxW="2xs" {...props}>
      <option>Victoria</option>
      <option>New South Wales</option>
      <option>Australian Capital Territory</option>
      <option>Western Australia</option>
      <option>Queensland</option>
      <option>Northern Territory</option>
      <option>South Australia</option>
      <option>Tasmania</option>
    </Select>
  </FormControl>
)
