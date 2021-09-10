import { Flex, Stack, Text, useColorModeValue as mode } from "@chakra-ui/react"

export interface StatCardProps {
  data: {
    label: string
    value: number
  }
}

export function StatCard(props: StatCardProps) {
  const { label, value } = props.data

  return (
    <Flex
      direction="column"
      align="center"
      p="6"
      bg={mode("white", "gray.700")}
      rounded="8px"
      shadow="base"
      color={mode("gray.500", "gray.400")}
      textAlign="center"
    >
      <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wide">
        {label}
      </Text>
      <Stack direction="row" align="center" my="3">
        <Text
          as="span"
          color={mode("gray.800", "white")}
          fontSize="4xl"
          fontWeight="bold"
          lineHeight="1"
        >
          {value}
        </Text>
      </Stack>
    </Flex>
  )
}
