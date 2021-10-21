import { Select, SelectProps } from "@chakra-ui/react"
import { UseFormRegisterReturn } from "react-hook-form"
import { STATES } from "../ui-utils"

interface StateSelectProps extends SelectProps {
  dataTestId?: string
  selectedState?: string
  registerFormField?: () => UseFormRegisterReturn
  children?: never
}

export const StateSelect = (props: StateSelectProps) => {
  const {
    dataTestId = "state",
    selectedState: defaultState,
    registerFormField,
    ...selectProps
  } = props

  return (
    <Select
      {...selectProps}
      {...registerFormField?.()}
      defaultValue={defaultState}
      data-testid={dataTestId}
    >
      <option key="null" value=""></option>
      {Array.from(STATES).map(([key, value]) => (
        <option key={key} value={value}>
          {value}
        </option>
      ))}
    </Select>
  )
}
