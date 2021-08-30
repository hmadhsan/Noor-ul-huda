import { Box, Stack } from '@chakra-ui/react'
import * as React from 'react'

interface UserProps {
  data: {
    name: string
    email: string
  }
}

export const User = (props: UserProps) => {
  const { name, email } = props.data
  return (
    <Stack direction="row" spacing="4" align="center">
      <Box>
        <Box fontSize="sm" fontWeight="medium">
          {name}
        </Box>
        <Box fontSize="sm" color="gray.500">
          {email}
        </Box>
      </Box>
    </Stack>
  )
}
