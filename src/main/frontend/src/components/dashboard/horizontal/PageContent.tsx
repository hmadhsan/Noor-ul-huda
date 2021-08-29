import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

export const PageContent = (props: BoxProps) => (
  <Box as="main" py="8" flex="1" {...props}>
    
      <Box bg={useColorModeValue('white', 'gray.700')} p="6" rounded="lg" shadow="base">
        <Box
          border="3px dashed currentColor"
          color={useColorModeValue('gray.200', 'gray.600')}
          h="96"
          rounded="lg"
        />
      </Box>
    
  </Box>
)
