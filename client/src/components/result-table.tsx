import type { IUserResDto } from '@/api-request/user/user.res.dto'
import { USER_STATUS } from '@/api-request/user/user.schema'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate } from '@/lib/utils'
import { Edit } from 'lucide-react'
import { Link } from 'react-router'
import { DeleteUserBtn } from './delete-user-btn'
import { Button } from './ui/button'

export const StatusBadge = ({ status }: { status: USER_STATUS }) => {
  return status === USER_STATUS.ACTIVE ? (
    <Badge className='bg-green-100 text-green-800 hover:bg-green-100'>Hoạt Động</Badge>
  ) : (
    <Badge className='bg-gray-100 text-gray-800 hover:bg-gray-100'>Không Hoạt Động</Badge>
  )
}

export default function ResultTable({ resultUsers }: { resultUsers: IUserResDto[] }) {
  return (
    <>
      <div className='bg-card border border-border rounded-lg overflow-hidden'>
        <Table>
          <TableHeader className='bg-muted'>
            <TableRow>
              <TableHead className='text-card-foreground'>ID</TableHead>
              <TableHead className='text-card-foreground'>Tên đăng nhập</TableHead>
              <TableHead className='text-card-foreground'>Tên hiển thị</TableHead>
              <TableHead className='text-card-foreground'>Email</TableHead>
              <TableHead className='text-card-foreground'>Số Điện Thoại</TableHead>
              <TableHead className='text-card-foreground'>Trạng Thái</TableHead>
              <TableHead className='text-card-foreground'>Ngày Tạo</TableHead>
              <TableHead className='text-card-foreground text-right'>Hành Động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resultUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className='text-center py-8 text-muted-foreground'>
                  Không có người dùng nào
                </TableCell>
              </TableRow>
            ) : (
              resultUsers.map((user) => (
                <TableRow key={user.id} className='hover:bg-muted/50'>
                  <TableCell className='font-medium'>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.displayName}</TableCell>
                  <TableCell className='text-sm text-muted-foreground'>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell className='text-sm text-muted-foreground'>
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex items-center justify-end gap-2'>
                      <Link to={`/users/${user.id}/edit`}>
                        <Button variant='ghost' size='icon-lg'>
                          <Edit className='w-4 h-4 text-orange-500' />
                        </Button>
                      </Link>
                      <DeleteUserBtn userId={user.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
