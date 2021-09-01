import { Flex, useColorModeValue as mode } from '@chakra-ui/react'
import { PageContent } from './PageContent'
import { PageHeader } from './PageHeader'

import NavBar  from '../navbar/NavBar'

const Dashboard = () => {
  
  return (
    <Flex direction="column" bg={mode('gray.100', 'gray.800')} height="100vh">
      <NavBar />  

      <PageHeader />
      <PageContent />
    </Flex>
  )
}

export default Dashboard