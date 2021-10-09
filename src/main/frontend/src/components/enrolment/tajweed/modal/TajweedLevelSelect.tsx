import { FormControl, FormLabel, Select, SelectProps } from "@chakra-ui/react"
import * as React from "react"

export const TajweedLevelSelect = (props: SelectProps) => (
  <FormControl id="level">
    <Select maxW="2xs" {...props}>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
    </Select>
  </FormControl>
)
