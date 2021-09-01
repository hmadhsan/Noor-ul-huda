import { Box, BoxProps, Container, useColorModeValue } from '@chakra-ui/react'
import { Table } from '../table/Table'

export const PageContent = (props: BoxProps) => (
  <Box as="main" py="8" flex="1" {...props}>
    <Container maxW="7xl">
      <Box bg={useColorModeValue('white', 'gray.700')} p="6" rounded="lg" shadow="base">
        <Box rounded="lg">
          <Table />
        </Box>
      </Box>
    </Container>
  </Box>
)
