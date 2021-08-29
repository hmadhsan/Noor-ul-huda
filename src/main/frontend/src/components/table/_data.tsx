import { Badge } from '@chakra-ui/react'
import * as React from 'react'
import { User } from './User'

export const data = [
  {
    role: '0406000000',
    status: 'Dandenong',
    user: {
      name: 'Rizwan Muzamil',
      email: 'codyfisher@example.com',
    },
  },
  {
    role: '0406111111',
    status: 'Dandenong',
    user: {
      name: 'Mohammad Khan',
      email: 'jane@example.com',
    },
  },
  {
    role: '0406222222',
    status: 'Narre Warren',
    user: {
      name: 'Muazzam Mushtaq',
      email: 'jenyzx@example.com',
    },
  },
  {
    role: '0406333333',
    status: 'Clyde',
    user: {
      name: 'Mudaser Syed',
      email: 'melyb@example.com',
    },
  },
]

const badgeEnum: Record<string, string> = {
  active: 'green',
  reviewing: 'orange',
  declined: 'red',
}

export const columns = [
  {
    Header: 'Name',
    accessor: 'user',
    Cell: function MemberCell(data: any) {
      return <User data={data} />
    },
  },
  {
    Header: 'Contact No',
    accessor: 'role',
  },
  {
    Header: 'Campus',
    accessor: 'status',
    Cell: function StatusCell(data: any) {
      return (
        <Badge fontSize="xs" colorScheme={badgeEnum[data]}>
          {data}
        </Badge>
      )
    },
  }
]
