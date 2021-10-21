import { Box, Heading, SimpleGrid, useColorModeValue as mode } from "@chakra-ui/react"
import data from "./data.json"
import { StatCard } from "./StatCard"
import React from "react"

export const Dashboard = () => {
  return (
    <React.Fragment>
      <Heading size="md" fontWeight="extrabold" mb="6">
        Dashboard
      </Heading>
      <Box as="section" bg={mode("gray.50", "gray.800")} p="10">
        <Box maxW="7xl" mx="auto" px={{ base: "6", md: "8" }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
            {data.map((stat, idx) => (
              <StatCard key={idx} data={stat} />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </React.Fragment>
  )
}
