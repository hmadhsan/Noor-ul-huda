import { FormControl, FormLabel, Select, SelectProps } from "@chakra-ui/react"

interface StateSelectProps extends SelectProps {
  selectedValue?: string
}

export const StateSelect = (props: StateSelectProps) => {
  const { selectedValue: state } = props

  return (
    <FormControl id="state">
      <FormLabel>State</FormLabel>
      <Select maxW="2xs" {...props} value={state}>
        <option key="vic" value="Victoria">
          Victoria
        </option>
        <option key="nsw" value="New South Wales">
          New South Wales
        </option>
        <option key="act" value="Australian Capital Territory">
          Australian Capital Territory
        </option>
        <option key="wa" value="Western Australia">
          Western Australia
        </option>
        <option key="qld" value="Queensland">
          Queensland
        </option>
        <option key="nt" value="Northern Territory">
          Northern Territory
        </option>
        <option key="sa" value="South Australia">
          South Australia
        </option>
        <option key="tas" value="Tasmania">
          Tasmania
        </option>
      </Select>
    </FormControl>
  )
}
