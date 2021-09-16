import {
  HStack,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode
} from "@chakra-ui/react"
import { Row, UseTableInstanceProps, UsePaginationInstanceProps } from "react-table"
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa"

type TableContentProps<T extends object> = UseTableInstanceProps<T> & UsePaginationInstanceProps<T>

export const TableContent = <T extends object>(props: TableContentProps<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } = props

  return (
    <Table my="7" borderWidth="1px" fontSize="md" {...getTableProps()} size="lg" variant="striped">
      <Thead bg={mode("gray.50", "gray.800")}>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                whiteSpace="nowrap"
                scope="col"
                {...column.getHeaderProps(column.getSortByToggleProps())}
                textAlign="center"
              >
                <HStack justify="center">
                  <Text>{column.render("Header")}</Text>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <FaSortAmountDown />
                    ) : (
                      <FaSortAmountUp />
                    )
                  ) : null}
                </HStack>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {page.map((row: Row<T>) => {
          prepareRow(row)
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <Td whiteSpace="nowrap" {...cell.getCellProps()} textAlign="center">
                    {cell.render("Cell")}
                  </Td>
                )
              })}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
