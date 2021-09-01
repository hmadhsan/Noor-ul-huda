import { Box, BoxProps, Container, Stack, useColorModeValue } from '@chakra-ui/react'
import { TabLink } from './TabLink'

export const PageHeader = (props: BoxProps) => (
  <Box bg={useColorModeValue('white', 'gray.900')} pt="8" shadow="sm" {...props}>
    <Container maxW="7xl">
      <Stack direction="row" spacing="4">
        <TabLink aria-current="page" href="#">Tajweed</TabLink>
      </Stack>
    </Container>
  </Box>
)
