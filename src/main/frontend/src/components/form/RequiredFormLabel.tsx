import { FormLabel, chakra } from "@chakra-ui/react"

interface RequiredFormLabelProps {
  label: string
}

export const RequiredFormLabel = ({ label }: RequiredFormLabelProps) => {
  return (
    <FormLabel>
      {label} <chakra.span color="red">*</chakra.span>
    </FormLabel>
  )
}
